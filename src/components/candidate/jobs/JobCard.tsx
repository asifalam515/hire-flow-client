import React from 'react';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  id: string;
  companyLogo: string;
  companyName: string;
  title: string;
  tags: string[];
  location: string;
  salary: string;
  timePosted: string;
}

export function JobCard({
  id,
  companyLogo,
  companyName,
  title,
  tags,
  location,
  salary,
  timePosted
}: JobCardProps) {
  return (
    <Link href={`/jobs/${id}`} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer block">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden">
          {companyLogo ? (
            <img src={companyLogo} alt={companyName} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-lg text-slate-400">{companyName.charAt(0)}</span>
          )}
        </div>
        
        <div>
          <p className="text-xs text-slate-500 font-medium mb-1">{companyName}</p>
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{title}</h3>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, idx) => (
          <span 
            key={idx} 
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md text-[10px] font-bold"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center gap-1.5 text-slate-500 mb-6">
        <MapPin className="w-3.5 h-3.5" />
        <span className="text-[11px] font-medium">{location}</span>
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{salary}</span>
        <span className="text-[10px] text-slate-400 font-medium">{timePosted}</span>
      </div>
    </Link>
  );
}
