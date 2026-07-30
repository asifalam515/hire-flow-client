import React from 'react';
import { Search, X } from 'lucide-react';
import { ChatData } from './types';

interface ChatListProps {
  chats: ChatData[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="w-full sm:w-[350px] lg:w-[400px] h-full flex flex-col bg-white dark:bg-zinc-950 border-r border-slate-100 dark:border-zinc-800 shrink-0">
      {/* Search Header */}
      <div className="p-4 border-b border-slate-100 dark:border-zinc-800 shrink-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
          />
          <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center gap-3 p-4 border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors text-left ${
              selectedChatId === chat.id ? 'bg-slate-100 dark:bg-zinc-900' : ''
            }`}
          >
            <div className="relative shrink-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden ${chat.color}`}>
                {chat.avatarUrl ? (
                   <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
                ) : (
                  chat.name.charAt(0)
                )}
              </div>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-950 rounded-full" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm truncate">{chat.name}</h3>
                <span className="text-xs text-slate-400 shrink-0 ml-2">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <span className="shrink-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
