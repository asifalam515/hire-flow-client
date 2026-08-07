import React, { useState, useRef, useEffect } from 'react';
import { Star, MoreVertical, Paperclip, Smile, Mic, Play, FileIcon as File, ImageIcon } from 'lucide-react';
import { ChatData, MessageData } from './types';

interface ChatAreaProps {
  chat: ChatData | null;
  messages: MessageData[];
  onSendMessage: (content: string) => void;
}

export function ChatArea({ chat, messages, onSendMessage }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  if (!chat) {
    return (
      <div className="flex-1 h-full flex items-center justify-center bg-white dark:bg-zinc-950">
        <p className="text-slate-400">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col bg-white dark:bg-zinc-950">
      {/* Header */}
      <div className="h-20 shrink-0 flex items-center justify-between px-6 border-b border-slate-100 dark:border-zinc-800">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden ${chat.color}`}>
            {chat.avatarUrl ? (
              <img src={chat.avatarUrl} alt={chat.name} className="w-full h-full object-cover" />
            ) : (
              chat.name.charAt(0)
            )}
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white leading-tight">{chat.name}</h2>
            <p className="text-xs text-slate-500">Last seen 15 minutes ago</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <Star className="w-5 h-5" />
          </button>
          <button className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-400">No messages here yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input */}
      <div className="p-4 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm min-w-0"
          />
          <button className="text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <Smile className="w-5 h-5" />
          </button>
          <button 
            className={`${inputValue.trim() ? 'text-blue-600 hover:text-blue-700' : 'text-slate-400 hover:text-slate-600'} transition-colors shrink-0`}
            onClick={handleSend}
          >
            {inputValue.trim() ? <Play className="w-5 h-5" fill="currentColor" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: MessageData }) {
  const isMe = msg.sender === 'me';

  return (
    <div className={`flex flex-col max-w-[70%] ${isMe ? 'self-end' : 'self-start'}`}>
      {/* File Message */}
      {msg.type === 'file' && msg.file && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 flex items-start gap-4 shadow-sm mb-1">
          <div className="w-12 h-12 bg-slate-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center shrink-0">
            <ImageIcon className="w-6 h-6 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{msg.file.name}</p>
            <p className="text-xs text-slate-500 mb-2">{msg.file.size}</p>
            <button className="text-xs font-bold text-blue-600 uppercase hover:underline">
              Open With
            </button>
          </div>
        </div>
      )}

      {/* Audio Message */}
      {msg.type === 'audio' && msg.audio && (
        <div className={`rounded-2xl p-3 flex items-center gap-3 mb-1 ${
          isMe ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-slate-300'
        }`}>
          <button className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isMe ? 'bg-blue-600 text-white' : 'bg-slate-400 text-white'
          }`}>
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          </button>
          <div className="flex-1 flex items-center gap-1 h-6">
            {/* Fake Waveform */}
            {[...Array(30)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 rounded-full ${
                  isMe ? 'bg-blue-400 dark:bg-blue-700' : 'bg-slate-300 dark:bg-slate-700'
                }`}
                style={{ 
                  height: `${Math.max(10, Math.sin(i * 0.5) * 50 + 50)}%`,
                  opacity: i < 15 ? 1 : 0.5
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium shrink-0">
            {msg.audio.duration}
          </span>
        </div>
      )}

      {/* Text Message */}
      {msg.type === 'text' && msg.content && (
        <div className={`rounded-2xl p-4 mb-1 relative group ${
          isMe 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-slate-800 dark:text-slate-200 rounded-tr-sm' 
            : 'bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-slate-200 rounded-tl-sm'
        }`}>
          {msg.senderName && !isMe && (
            <div className="mb-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{msg.senderName}</span>
              <p className="text-xs text-slate-500">Voice message</p>
            </div>
          )}
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
        </div>
      )}

      {/* Time and Reaction (if any) */}
      <div className={`flex items-center gap-2 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
        <span className="text-[11px] text-slate-400">{msg.time}</span>
      </div>
    </div>
  );
}
