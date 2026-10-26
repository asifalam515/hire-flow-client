'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useJobStore } from '@/store/useJobStore';
import { Card } from '@/components/ui/card';
import { MapPin, Share2, Bookmark, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export interface JobItem {
  id: string;
  company: string;
  role: string;
  tags: string[];
  location: string;
  salary: string;
  postedAt: string;
  logoBg?: string;
  logoColor?: string;
  logoText?: string;
  logoUrl?: string;
  defaultActionsVisible?: boolean;
}

export type JobCardProps =
  | { job: JobItem; id?: never; companyName?: never; title?: never; tags?: never; location?: never; salary?: never; timePosted?: never; companyLogo?: never; defaultActionsVisible?: never }
  | {
      id: string;
      companyName: string;
      title: string;
      tags: string[];
      location: string;
      salary: string;
      timePosted: string;
      companyLogo?: string;
      job?: never;
      defaultActionsVisible?: boolean;
    };

export function JobCard(props: JobCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { savedJobIds, toggleSaveJob } = useJobStore();
  
  // Normalize incoming props to single canonical JobItem structure
  const job: JobItem = props.job
    ? props.job
    : {
        id: props.id,
        company: props.companyName,
        role: props.title,
        tags: props.tags || [],
        location: props.location,
        salary: props.salary,
        postedAt: props.timePosted,
        logoUrl: props.companyLogo,
        logoText: props.companyName ? props.companyName.charAt(0).toUpperCase() : 'H',
        logoBg: 'bg-gradient-to-br from-blue-600 to-indigo-600',
        logoColor: 'text-white',
        defaultActionsVisible: props.defaultActionsVisible
      };

  const [isShared, setIsShared] = useState(false);
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);

  const isSaved = savedJobIds.includes(job.id);

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to save jobs');
      router.push('/login');
      return;
    }
    toggleSaveJob(job.id);
    toast.success(isSaved ? 'Job removed from saved list' : 'Job saved to your bookmarks');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsShared(true);

    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/jobs/${job.id}`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Job link copied to clipboard!');
      } catch (err) {
        toast.success('Job URL ready to share');
      }
    } else {
      toast.success('Job URL ready to share');
    }

    setTimeout(() => setIsShared(false), 2000);
  };

  const hasValidLogo = job.logoUrl && !logoLoadFailed;

  return (
    <Card
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-400/50 dark:hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-200 cursor-pointer p-5 sm:p-6 flex flex-col justify-between"
    >
      {/* Top Header: Logo + Company/Role + Actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 min-w-0">
          {/* Company Logo Badge */}
          <div
            className={`size-12 sm:size-14 rounded-2xl flex items-center justify-center font-black text-base sm:text-lg shrink-0 shadow-sm border border-slate-200/60 dark:border-zinc-800 transition-transform duration-300 group-hover:scale-105 overflow-hidden ${
              hasValidLogo ? 'bg-white dark:bg-zinc-950' : (job.logoBg || 'bg-gradient-to-br from-blue-600 to-indigo-600') + ' ' + (job.logoColor || 'text-white')
            }`}
          >
            {hasValidLogo ? (
              <img
                src={job.logoUrl}
                alt={`${job.company} logo`}
                onError={() => setLogoLoadFailed(true)}
                className="w-full h-full object-contain p-1.5"
              />
            ) : (
              <span>{job.logoText || job.company.charAt(0).toUpperCase()}</span>
            )}
          </div>

          {/* Company Name & Role Title */}
          <div className="space-y-0.5 min-w-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 block truncate">
              {job.company}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate leading-tight">
              {job.role}
            </h3>
          </div>
        </div>

        {/* Share & Save Icons:
            Mobile: Always visible (opacity-100) to eliminate touch traps
            Desktop: Hover-slide reveal (md:opacity-0 md:group-hover:opacity-100) */}
        <div
          className={`flex items-center gap-1.5 transition-all duration-200 ${
            job.defaultActionsVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-x-1 md:group-hover:translate-x-0'
          }`}
        >
          <button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${job.role} at ${job.company}`}
            title="Share Job"
            className="size-8 sm:size-9 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            {isShared ? (
              <Check className="size-4 text-emerald-600 animate-in zoom-in" />
            ) : (
              <Share2 className="size-4 text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400" />
            )}
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            aria-label={`${isSaved ? 'Remove from saved' : 'Save'} ${job.role} at ${job.company}`}
            title={isSaved ? 'Remove bookmark' : 'Bookmark job'}
            className={`size-8 sm:size-9 rounded-xl border flex items-center justify-center transition-all shadow-sm cursor-pointer ${
              isSaved
                ? 'bg-blue-600 border-blue-600 text-white shadow-blue-600/20 shadow-md'
                : 'border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-800 text-slate-600 dark:text-zinc-400'
            }`}
          >
            <Bookmark className={`size-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Middle Tags & Location */}
      <div className="mt-4 space-y-3">
        {/* Badges / Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {job.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="rounded-lg bg-slate-100 dark:bg-zinc-800 px-2 py-1 text-[10px] font-semibold text-slate-500 dark:text-zinc-400">
              +{job.tags.length - 3}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-zinc-400 pt-0.5">
          <MapPin className="size-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
      </div>

      {/* Bottom Footer: Salary + Posted Time */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
        <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          {job.salary}
        </div>
        <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500 whitespace-nowrap">
          {job.postedAt}
        </span>
      </div>
    </Card>
  );
}
