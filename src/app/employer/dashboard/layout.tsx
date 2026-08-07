'use client';

import React, { useState, useEffect } from 'react';
import { EmployerSidebar } from '@/components/employer/EmployerSidebar';
import { EmployerHeader } from '@/components/employer/EmployerHeader';
import { useSocket } from '@/hooks/useSocket';
import { useMessageStore } from '@/store/useMessageStore';
import { apiClient } from '@/lib/api';

import { useAuthStore } from '@/store/useAuthStore';

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { socket, isConnected } = useSocket();
  const { conversations, setConversations, addMessage, incrementUnreadCount } = useMessageStore();


  // Global socket setup and fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await apiClient.get('/messages/conversations');
        // @ts-ignore
        const data = res.data?.data || res.data;
        const formatted = data.map((conv: any) => {
          const partnerName = conv.candidate ? `${conv.candidate.firstName || ''} ${conv.candidate.lastName || ''}`.trim() : 'Unknown Candidate';
          return {
            id: conv.id,
            name: partnerName || 'Unknown',
            avatarUrl: conv.candidate?.avatarUrl || '',
            color: 'bg-indigo-600',
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
      // Don't increment if we are the sender
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
        <EmployerSidebar onMobileClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <EmployerHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
