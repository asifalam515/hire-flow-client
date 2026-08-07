'use client';

import React, { useState, useEffect } from 'react';
import { CandidateSidebar } from '@/components/candidate/CandidateSidebar';
import { CandidateHeader } from '@/components/candidate/CandidateHeader';
import { useSocket } from '@/hooks/useSocket';
import { useMessageStore } from '@/store/useMessageStore';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useFCM } from '@/hooks/useFCM';
import { useNotificationStore } from '@/store/useNotificationStore';

export default function CandidateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  useFCM(); // Initialize Firebase Cloud Messaging for Push Notifications
  const { socket, isConnected } = useSocket();
  const { conversations, setConversations, incrementUnreadCount } = useMessageStore();
  const { fetchNotifications } = useNotificationStore();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  // Global socket setup and fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await apiClient.get('/messages/conversations');
        // @ts-ignore
        const data = res.data?.data || res.data || [];
        const formatted = data.map((conv: any) => {
          const partnerName = conv.company ? conv.company.name : (conv.recruiter ? `${conv.recruiter.firstName} ${conv.recruiter.lastName}` : 'Unknown');
          const partnerAvatar = conv.company?.logoUrl || conv.recruiter?.avatarUrl || '';
          
          return {
            id: conv.id,
            name: partnerName,
            avatarUrl: partnerAvatar,
            color: 'bg-blue-600',
            lastMessage: conv.messages?.[0]?.content || (conv.messages?.[0]?.type === 'FILE' ? 'Sent a file' : ''),
            time: conv.messages?.[0]?.createdAt ? new Date(conv.messages[0].createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unreadCount: conv._count?.messages || 0,
            isOnline: false
          };
        });
        setConversations(formatted);
      } catch (error) {
        console.error('Failed to fetch conversations globally:', error);
      }
    };
    fetchConversations();
  }, [setConversations]);

  useEffect(() => {
    if (!socket || !isConnected || conversations.length === 0) return;

    // Join all conversation rooms to receive background messages
    conversations.forEach(conv => {
      socket.emit('join_room', conv.id);
    });

    const handleReceiveMessage = (msg: any) => {
      if (msg.senderId === user?.id) return;
      
      const activeConversationId = useMessageStore.getState().activeConversationId;
      if (msg.conversationId !== activeConversationId) {
        incrementUnreadCount(msg.conversationId);
      }
    };

    socket.on('receive_message', handleReceiveMessage);
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket, isConnected, conversations, incrementUnreadCount, user?.id]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with mobile transformation */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <CandidateSidebar onMobileClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <CandidateHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
