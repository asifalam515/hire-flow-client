import React from 'react';
import Link from 'next/link';
import { Search, Bell, Plus } from 'lucide-react';

export function EmployerHeader() {
  return (
    <header className="h-28 bg-white dark:bg-zinc-950 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
      {/* Title Area */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity</h1>
        <p className="text-sm text-slate-500 mt-1">Updating your information will offer you the most relevant content</p>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search"
            className="block w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Post a Job Button */}
        <Link 
          href="/employer/dashboard/post-job"
          className="flex items-center gap-2 px-5 py-2.5 border border-slate-300 dark:border-zinc-700 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
        >
          <Plus className="w-5 h-5 text-slate-500" />
          Post a Job
        </Link>
        
        {/* Notification & Profile */}
        <div className="flex items-center gap-6">
          <button className="text-slate-600 dark:text-slate-400 relative hover:text-slate-900 transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white dark:border-zinc-950">
              30
            </span>
          </button>
          
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-900 text-white overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all flex-shrink-0">
            {/* Using a placeholder for BMW logo */}
            <span className="font-bold text-sm">B</span>
          </button>
        </div>
      </div>
    </header>
  );
}
