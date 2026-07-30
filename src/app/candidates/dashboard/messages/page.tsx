'use client';

import React, { useState } from 'react';
import { ChatList } from '@/components/candidate/messages/ChatList';
import { ChatArea } from '@/components/candidate/messages/ChatArea';
import { ChatData, MessageData } from '@/components/candidate/messages/types';

const DUMMY_CHATS: ChatData[] = [
  { id: '1', name: 'Schlumberger', color: 'bg-[#003B5C]', lastMessage: "Your application for the 'Business Analyst' role is s...", time: '1 minutes ago', unreadCount: 4, isOnline: true },
  { id: '2', name: 'Woodplc', color: 'bg-white border border-slate-200', lastMessage: "To proceed with your application for the 'Product Man...", time: '6 minutes ago', unreadCount: 0, isOnline: false },
  { id: '3', name: 'Etihad Airways', color: 'bg-[#002855]', lastMessage: "Dear Ana, Thank you for your interest in the 'Front-en...", time: '7 minutes ago', unreadCount: 0, isOnline: false },
  { id: '4', name: 'IOGP', color: 'bg-[#006633]', lastMessage: "Good news! You've been shortlisted for the next stage...", time: '9 minutes ago', unreadCount: 0, isOnline: false },
  { id: '5', name: 'Baker Hughes', color: 'bg-[#004B87]', lastMessage: "We'd appreciate your feedback on your recent int...", time: '10 minutes ago', unreadCount: 5, isOnline: false },
  { id: '6', name: 'Aramco', color: 'bg-[#00A3E0]', lastMessage: "We wanted to inform you that the 'HR Coordinator'...", time: '15 minutes ago', unreadCount: 5, isOnline: false },
  { id: '7', name: 'Emirates Global', color: 'bg-[#222222]', lastMessage: "We'd appreciate your feedback on your recent intervie...", time: '16 minutes ago', unreadCount: 0, isOnline: false },
  { id: '8', name: 'Partners Success', color: 'bg-[#E31837]', lastMessage: "Dear Ana, Thank you for your interest in the 'Front-en...", time: '23 minutes ago', unreadCount: 0, isOnline: false },
  { id: '9', name: 'Weir', color: 'bg-[#005596]', lastMessage: "Thank you for applying for the 'Software Engineer'...", time: '59 minutes ago', unreadCount: 1, isOnline: true },
  { id: '10', name: 'Tuv-nord', color: 'bg-[#005697]', lastMessage: "We were impressed with your resume and would li...", time: '22 hour ago', unreadCount: 9, isOnline: false },
  { id: '11', name: 'ADNOC', color: 'bg-[#003B5C]', lastMessage: "You're invited to our upcoming virtual career event, wh...", time: '3 days ago', unreadCount: 0, isOnline: false },
];

const DUMMY_MESSAGES: Record<string, MessageData[]> = {
  '8': [
    {
      id: 'm1',
      sender: 'other',
      type: 'file',
      time: '2:45',
      file: { name: 'Oh, hello! All perfectly will check.pdf', size: '74.7 KB', url: '#' }
    },
    {
      id: 'm2',
      sender: 'other',
      type: 'audio',
      time: '2:45',
      audio: { duration: '2:45', waveform: '' }
    },
    {
      id: 'm3',
      sender: 'me',
      type: 'audio',
      time: '2:45',
      audio: { duration: '2:45', waveform: '' }
    },
    {
      id: 'm4',
      sender: 'other',
      type: 'text',
      content: 'Oh, hello! All perfectly.I will check it and get back to you son Oh, hello! All perfectly.I will check it and get back to you soon',
      time: '2:45'
    },
    {
      id: 'm5',
      sender: 'other',
      senderName: 'Ana amiri',
      type: 'text',
      content: 'Oh, hello! All perfectly.I will check it and get back to you son Oh, hello! All perfectly.I will check it and get back to you soon',
      time: '2:45'
    },
    {
      id: 'm6',
      sender: 'me',
      type: 'text',
      content: 'Dear Ana, Thank you for your interest in the \'Front-end Developer\' position at TechNova Inc. While we were impressed by your background.',
      time: '2:45'
    }
  ]
};

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const selectedChat = DUMMY_CHATS.find(c => c.id === selectedChatId) || null;
  const messages = selectedChatId ? DUMMY_MESSAGES[selectedChatId] || [] : [];

  return (
    <div className="flex h-full bg-white dark:bg-zinc-950 overflow-hidden relative">
      <div className={`h-full shrink-0 ${selectedChatId ? 'hidden md:block' : 'w-full md:w-auto'}`}>
         <ChatList 
           chats={DUMMY_CHATS} 
           selectedChatId={selectedChatId} 
           onSelectChat={setSelectedChatId} 
         />
      </div>
      
      <div className={`flex-1 h-full ${!selectedChatId ? 'hidden md:block' : 'block'}`}>
        <ChatArea 
          chat={selectedChat} 
          messages={messages} 
        />
      </div>
    </div>
  );
}
