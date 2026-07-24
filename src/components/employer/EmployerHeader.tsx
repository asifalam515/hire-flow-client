import React from 'react';
import Link from 'next/link';
import { Search, Bell, User } from 'lucide-react';

export function EmployerHeader() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-6 sticky top-0 z-10 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-zinc-800 rounded-lg leading-5 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <Link 
          href="/employer/dashboard/post-job"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          Post a Job
        </Link>
        
        <div className="flex items-center gap-4 border-l border-slate-200 dark:border-zinc-800 pl-6">
          <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 relative transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>
          
          <button className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 overflow-hidden ring-2 ring-transparent hover:ring-blue-500 transition-all">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
