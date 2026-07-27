import React, { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useJobStore } from '@/store/useJobStore';

export function JobSearchBar() {
  const { filters, setFilter } = useJobStore();
  const [searchValue, setSearchValue] = useState(filters.search || '');
  const [locationValue, setLocationValue] = useState(filters.location || '');

  const handleSearch = () => {
    setFilter('search', searchValue);
    setFilter('location', locationValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-1 shadow-sm">
      <div className="flex items-center w-full sm:flex-1 px-3 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-zinc-800 py-2 sm:py-0">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Job title or keywords" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex items-center w-full sm:flex-1 px-3 py-2 sm:py-0">
        <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="Location" 
          value={locationValue}
          onChange={(e) => setLocationValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-slate-900 dark:text-white placeholder:text-slate-400"
        />
        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 cursor-pointer hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
      </div>
      
      <button 
        onClick={handleSearch}
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-colors shrink-0 mt-2 sm:mt-0"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </div>
  );
}
