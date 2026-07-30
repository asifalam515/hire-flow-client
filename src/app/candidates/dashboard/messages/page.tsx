'use client';

import React, { useEffect } from 'react';
import { ChatList } from '@/components/candidate/messages/ChatList';
import { ChatArea } from '@/components/candidate/messages/ChatArea';
import { useMessageStore } from '@/store/useMessageStore';
import { useSocket } from '@/hooks/useSocket';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/lib/api';

export default function MessagesPage() {
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
        const data = (res as any).data.data;
        // Map backend conversations to ChatData format
        const formattedConversations = data.map((conv: any) => {
          // If we are candidate, we chat with company/recruiter
          const partnerName = conv.company ? conv.company.name : (conv.recruiter ? `${conv.recruiter.firstName} ${conv.recruiter.lastName}` : 'Unknown');
          const partnerAvatar = conv.company?.logoUrl || conv.recruiter?.avatarUrl || '';
          
          return {
            id: conv.id,
            name: partnerName,
            avatarUrl: partnerAvatar,
            color: 'bg-blue-600', // Default color, can be randomized
            lastMessage: conv.messages?.[0]?.content || (conv.messages?.[0]?.type === 'FILE' ? 'Sent a file' : ''),
            time: conv.messages?.[0]?.createdAt ? new Date(conv.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unreadCount: conv._count?.messages || 0,
            isOnline: false // Can implement presence later
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
        const data = (res as any).data.data;
        
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
        type: msg.type.toLowerCase() as 'text' | 'file' | 'audio',
        content: msg.content,
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        file: msg.fileUrl ? { name: msg.fileName || 'Attachment', url: msg.fileUrl, size: msg.fileSize || '' } : undefined,
        audio: msg.audioDuration ? { duration: msg.audioDuration, waveform: '' } : undefined
      };

      addMessage(msg.conversationId, formattedMessage);

      // If we are not actively in this chat, increment unread count
      if (!isMe && msg.conversationId !== activeConversationId) {
        const conv = conversations.find(c => c.id === msg.conversationId);
        if (conv) {
          updateUnreadCount(msg.conversationId, (conv.unreadCount || 0) + 1);
        }
      }
    };

    socket.on('receive_message', handleReceiveMessage);

    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, isConnected, activeConversationId, user?.id, addMessage, conversations, updateUnreadCount]);

  // 4. Handle send message
  const handleSendMessage = async (content: string) => {
    if (!activeConversationId) return;

    try {
      // Send to REST API (which will also emit to socket)
      const res = await apiClient.post(`/messages/conversations/${activeConversationId}/messages`, {
        content,
        type: 'TEXT'
      });
      
      // We don't need to manually add it to our state here because 
      // the socket 'receive_message' event will catch our own message too,
      // since we emit it to the room from the backend. 
      // But adding it optimistically is better for UX.
      const msg = (res as any).data.data;
      const formattedMessage = {
        id: msg.id,
        sender: 'me' as 'me',
        type: 'text' as 'text',
        content: msg.content,
        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      addMessage(activeConversationId, formattedMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const activeChat = conversations.find((c) => c.id === activeConversationId) || null;
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950 overflow-hidden relative">
      <div className={`h-full shrink-0 ${activeConversationId ? 'hidden md:block' : 'w-full md:w-auto'}`}>
         <ChatList 
           chats={conversations} 
           selectedChatId={activeConversationId} 
           onSelectChat={setActiveConversationId} 
         />
      </div>
      
      <div className={`flex-1 h-full ${!activeConversationId ? 'hidden md:block' : 'block'}`}>
        <ChatArea 
          chat={activeChat} 
          messages={activeMessages} 
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
