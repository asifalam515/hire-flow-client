'use client';

import React, { useEffect } from 'react';
import { ChatList } from '@/components/candidate/messages/ChatList';
import { ChatArea } from '@/components/candidate/messages/ChatArea';
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
            isOnline: false
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
        const data = res.data?.data || res.data;
        
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
    
    // We can optimistically add the message if we want, but since socket is fast, 
    // we just let the socket receive it back. Or we can wait for API response.
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

      {/* Right Side - Chat Area */}
      <div className={`flex-1 h-full flex flex-col ${!activeConversationId ? 'hidden md:flex' : 'flex'}`}>
        <ChatArea
          chat={activeChatData}
          messages={activeMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
