'use client';

import React, { useEffect, useState } from 'react';
import { Bot, Video, Sparkles, ExternalLink, Calendar } from 'lucide-react';
import { ChatList } from '@/components/candidate/messages/ChatList';
import { ChatArea } from '@/components/candidate/messages/ChatArea';
import { AiScreeningModal } from '@/components/employer/AiScreeningModal';
import { ScheduleInterviewModal } from '@/components/employer/ScheduleInterviewModal';
import { useMessageStore } from '@/store/useMessageStore';
import { useSocket } from '@/hooks/useSocket';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api';

export default function EmployerMessagesPage() {
  const { user } = useAuthStore();
  const {
    conversations,
    messages,
    activeConversationId,
    setConversations,
    setMessages,
    addMessage,
    setActiveConversationId,
    updateUnreadCount
  } = useMessageStore();

  const { socket, isConnected } = useSocket();

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  // 1. Fetch conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await apiClient.get('/messages/conversations');
        // @ts-ignore
        const data = res.data?.data || res.data || [];
        
        // Map backend conversations to ChatData format
        const formattedConversations = data.map((conv: any) => {
          // If we are employer/recruiter, we chat with the candidate
          const partnerName = conv.candidate ? `${conv.candidate.firstName || ''} ${conv.candidate.lastName || ''}`.trim() : 'Unknown Candidate';
          const partnerAvatar = conv.candidate?.avatarUrl || '';
          
          return {
            id: conv.id,
            name: partnerName || 'Unknown',
            avatarUrl: partnerAvatar,
            color: 'bg-indigo-600', // Distinct color for employer dashboard
            lastMessage: conv.messages?.[0]?.content || (conv.messages?.[0]?.type === 'FILE' ? 'Sent a file' : ''),
            time: conv.messages?.[0]?.createdAt ? new Date(conv.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unreadCount: conv._count?.messages || 0,
            isOnline: false,
            candidateUserId: conv.candidateId,
            candidateEmail: conv.candidate?.email || '',
            atsContext: conv.atsContext || null,
          };
        });
        setConversations(formattedConversations);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    fetchConversations();
  }, [setConversations]);

  // 2. Fetch messages when active conversation changes
  useEffect(() => {
    if (!activeConversationId) return;

    const fetchMessages = async () => {
      try {
        const res = await apiClient.get(`/messages/conversations/${activeConversationId}/messages`);
        // @ts-ignore
        const data = res.data?.data || res.data || [];
        
        const formattedMessages = data.map((msg: any) => ({
          id: msg.id,
          sender: (msg.senderId === user?.id ? 'me' : 'other') as 'me' | 'other',
          type: msg.type.toLowerCase(),
          content: msg.content,
          time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          file: msg.fileUrl ? { name: msg.fileName || 'Attachment', url: msg.fileUrl, size: msg.fileSize || '' } : undefined,
          audio: msg.audioDuration ? { duration: msg.audioDuration, waveform: '' } : undefined
        }));

        setMessages(activeConversationId, formattedMessages);
        
        // Mark as read
        await apiClient.put(`/messages/conversations/${activeConversationId}/read`);
        updateUnreadCount(activeConversationId, 0);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
  }, [activeConversationId, setMessages, updateUnreadCount, user?.id]);

  // 3. Socket event listeners
  useEffect(() => {
    if (!socket || !isConnected) return;

    if (activeConversationId) {
      socket.emit('join_room', activeConversationId);
    }

    const handleReceiveMessage = (msg: any) => {
      const isMe = msg.senderId === user?.id;
      
      const formattedMessage = {
        id: msg.id,
        sender: (isMe ? 'me' : 'other') as 'me' | 'other',
        type: msg.type.toLowerCase(),
        content: msg.content,
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: msg.fileUrl ? { name: msg.fileName || 'Attachment', url: msg.fileUrl, size: msg.fileSize || '' } : undefined,
        audio: msg.audioDuration ? { duration: msg.audioDuration, waveform: '' } : undefined
      };

      addMessage(msg.conversationId, formattedMessage);

      // If we receive a message in the active chat and it's not from us, mark as read
      if (msg.conversationId === activeConversationId && !isMe) {
        apiClient.put(`/messages/conversations/${activeConversationId}/read`).catch(console.error);
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      if (activeConversationId) {
        socket.emit('leave_room', activeConversationId);
      }
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, isConnected, activeConversationId, addMessage, updateUnreadCount, user?.id]);

  // 4. Send Message Handler
  const handleSendMessage = async (content: string) => {
    if (!activeConversationId || !user?.id) return;
    
    try {
      await apiClient.post(`/messages/conversations/${activeConversationId}/messages`, {
        content,
        type: 'TEXT'
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const activeChatData = conversations.find(c => c.id === activeConversationId) || null;
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  return (
    <div className="flex h-[calc(100vh-80px)] w-full overflow-hidden">
      {/* Left Sidebar - Chat List */}
      <div className={`h-full ${activeConversationId ? 'hidden md:block' : 'block'} md:w-[350px] lg:w-[400px] shrink-0 border-r border-slate-100 dark:border-zinc-800`}>
        <ChatList
          chats={conversations}
          selectedChatId={activeConversationId}
          onSelectChat={setActiveConversationId}
        />
      </div>

      {/* Right Side - Chat Area & Intelligence Header */}
      <div className={`flex-1 h-full flex flex-col ${!activeConversationId ? 'hidden md:flex' : 'flex'} overflow-hidden`}>
        {/* ATS Candidate Intelligence Bar */}
        {activeChatData?.atsContext && (
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-slate-50 dark:from-zinc-900/90 dark:via-zinc-900 dark:to-zinc-950 border-b border-indigo-100/80 dark:border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-zinc-200">
                  Target Role:
                </span>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  {activeChatData.atsContext.jobTitle || 'Active Job'}
                </span>
              </div>

              {typeof activeChatData.atsContext.matchScore === 'number' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {activeChatData.atsContext.matchScore}% ATS Fit
                </span>
              )}

              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200/80 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 uppercase tracking-wider">
                {activeChatData.atsContext.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-sm transition-all hover:scale-[1.02]"
              >
                <Bot className="w-3.5 h-3.5" />
                AI Screening
              </button>

              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Schedule Interview
              </button>

              <a
                href={`/interviews/${activeChatData.atsContext.applicationId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                Video Chamber
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        )}

        <div className="flex-1 min-h-0">
          <ChatArea
            chat={activeChatData}
            messages={activeMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      {/* Modals */}
      {activeChatData?.atsContext && (
        <>
          <AiScreeningModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            applicationId={activeChatData.atsContext.applicationId}
            candidateName={activeChatData.name}
            jobTitle={activeChatData.atsContext.jobTitle || 'Role'}
          />

          <ScheduleInterviewModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            applicationId={activeChatData.atsContext.applicationId}
            candidateName={activeChatData.name}
            candidateEmail={activeChatData.candidateEmail || ''}
            jobTitle={activeChatData.atsContext.jobTitle || 'Role'}
            onScheduledSuccess={() => {
              setIsScheduleModalOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
