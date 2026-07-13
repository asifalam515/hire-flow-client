'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Share2, Bookmark, Check } from 'lucide-react';

export interface JobItem {
  id: string;
  company: string;
  role: string;
  tags: string[];
  location: string;
  salary: string;
  postedAt: string;
  logoBg: string;
  logoColor: string;
  logoText: string;
  defaultActionsVisible?: boolean;
}

interface JobCardProps {
  job: JobItem;
}

export function JobCard({ job }: JobCardProps) {
  const [isClicked, setIsClicked] = useState(job.defaultActionsVisible || false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleCardClick = () => {
    setIsClicked(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer p-6 flex flex-col justify-between ${
        isClicked
          ? 'border-blue-500/60 dark:border-blue-500/60 shadow-xl shadow-blue-600/10 bg-white dark:bg-zinc-900 -translate-y-1'
          : 'border-blue-100/80 dark:border-border/60 bg-white/95 dark:bg-zinc-900/90 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-600/10 hover:border-blue-400/50 hover:-translate-y-1.5'
      }`}
    >
      {/* Top Header: Logo + Company/Role + Actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          {/* Company Logo Badge */}
          <div
            className={`size-14 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl shrink-0 shadow-sm border border-border/30 transition-transform duration-300 group-hover:scale-105 ${job.logoBg} ${job.logoColor}`}
          >
            {job.logoText}
          </div>

          {/* Company Name & Role Title */}
          <div className="space-y-1 min-w-0">
            <span className="text-xs font-semibold text-muted-foreground block truncate">
              {job.company}
            </span>
            <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate leading-tight">
              {job.role}
            </h3>
          </div>
        </div>

        {/* Share & Save Icons (Visible on Click or Hover or when defaultActionsVisible) */}
        <div
          className={`flex items-center gap-2 transition-all duration-300 ${
            isClicked || job.defaultActionsVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
          }`}
        >
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share Job"
            className="size-9 rounded-xl border border-border/80 bg-muted/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/50 flex items-center justify-center transition-all shadow-sm"
          >
            {isShared ? (
              <Check className="size-4 text-emerald-600 animate-in zoom-in" />
            ) : (
              <Share2 className="size-4 text-muted-foreground hover:text-blue-600" />
            )}
          </button>
          <button
            type="button"
            onClick={handleSave}
            aria-label="Save Job"
            className={`size-9 rounded-xl border flex items-center justify-center transition-all shadow-sm ${
              isSaved
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'border-border/80 bg-muted/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:hover:bg-blue-950/50 text-muted-foreground'
            }`}
          >
            <Bookmark className={`size-4 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>

      {/* Middle Tags & Location */}
      <div className="mt-5 space-y-3">
        {/* Badges / Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground pt-1">
          <MapPin className="size-4 text-muted-foreground shrink-0" />
          <span>{job.location}</span>
        </div>
      </div>

      {/* Bottom Footer: Salary + Posted Time */}
      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between gap-4">
        <div className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400">
          {job.salary}
        </div>
        <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
          {job.postedAt}
        </span>
      </div>
    </Card>
  );
}
