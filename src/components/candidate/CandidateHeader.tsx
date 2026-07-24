'use client';

import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

export function CandidateHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-20 lg:h-28 bg-white dark:bg-zinc-950 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-10 shrink-0 border-b border-slate-100 dark:border-zinc-800">
      
      {/* Title Area & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-zinc-900"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="hidden md:block text-sm text-slate-500 mt-1">Updating your information will offer you the most relevant content</p>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Search */}
        <div className="relative hidden md:block w-72">
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
        </div>
        
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-zinc-900">
          <Search className="w-5 h-5" />
        </button>
        
        {/* Notification & Profile */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="text-slate-600 dark:text-slate-400 relative hover:text-slate-900 transition-colors">
            <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white dark:border-zinc-950">
              30
            </span>
          </button>
          
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="flex items-center justify-center h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-600 overflow-hidden shrink-0 ring-2 ring-transparent hover:ring-blue-500 transition-all">
              <img src="https://i.pravatar.cc/150?img=47" alt="Kathryn Murphy" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Kathryn Murphy</p>
              <p className="text-xs text-slate-500 leading-tight">Kathrynmurphy@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
