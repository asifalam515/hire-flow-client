import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

export function JobSearchBar() {
  return (
    <div className="flex items-center w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-1 shadow-sm">
      <div className="flex items-center flex-1 px-3 border-r border-slate-200 dark:border-zinc-800">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Job title or keywords" 
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex items-center flex-1 px-3">
        <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="location" 
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400"
        />
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
      </div>
      
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors shrink-0">
        <Search className="w-4 h-4" />
        Search
      </button>
    </div>
  );
}
