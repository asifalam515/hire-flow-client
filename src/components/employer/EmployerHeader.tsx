'use client';

import React from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export function EmployerHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuthStore();

  return (
    <header className="h-20 lg:h-24 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-10">
      
      {/* Title & Mobile Menu Area */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-zinc-800"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Activity</h2>
          <p className="hidden md:block text-sm text-slate-500">Here is your daily activities and job updates</p>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-4 lg:gap-6">
        
        {/* Search */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search jobs, candidates..."
            className="w-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-sm rounded-xl pl-11 pr-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        
        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg dark:text-slate-400 dark:hover:bg-zinc-800">
          <Search className="w-5 h-5" />
        </button>

        {/* Post Job Button */}
        <Link href="/employer/dashboard/post-job">
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-blue-600/20">
            <Plus className="w-4 h-4" />
            New Job
          </button>
        </Link>

        {/* Notifications & Profile */}
        <div className="flex items-center gap-4 border-l border-slate-200 dark:border-zinc-800 pl-4 lg:pl-6 ml-2 lg:ml-0">
          <button className="relative p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Bell className="w-5 h-5 lg:w-6 lg:h-6" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-zinc-900"></span>
          </button>
          
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden ring-2 ring-transparent hover:ring-blue-500 cursor-pointer transition-all shrink-0">
            <img 
              src={user?.avatarUrl || "https://i.pravatar.cc/150?img=11"} 
              alt={user?.firstName || "Profile"} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
