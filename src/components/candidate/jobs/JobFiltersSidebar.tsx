import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  isOpen?: boolean;
}

const FilterSection = ({ title, isOpen = true }: FilterSectionProps) => {
  return (
    <div className="py-4 border-b border-slate-100 dark:border-zinc-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors px-4 -mx-4">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </div>
    </div>
  );
};

export function JobFiltersSidebar() {
  const filterSections = [
    'Work Language',
    'Publication date',
    'Education level',
    'Job type',
    'Distance',
    'Salary (Monthly)',
    'Work modes'
  ];

  return (
    <div className="w-[280px] shrink-0 bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800 px-4 py-2">
      <div className="py-4 border-b border-slate-100 dark:border-zinc-800 px-4 -mx-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/50">
        <span className="font-semibold text-sm text-slate-900 dark:text-white">All Filters</span>
      </div>
      <div className="py-4 border-b border-slate-100 dark:border-zinc-800 px-4 -mx-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-zinc-800/50">
        <span className="font-semibold text-sm text-slate-900 dark:text-white">Active Filters</span>
      </div>
      
      {filterSections.map((section, idx) => (
        <FilterSection key={idx} title={section} isOpen={false} />
      ))}
    </div>
  );
}
