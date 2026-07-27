import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-900 font-medium text-sm">
        1
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm">
        2
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm">
        3
      </button>
      
      <span className="text-slate-400 px-1">...</span>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm">
        9
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm">
        10
      </button>
      
      <button className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
