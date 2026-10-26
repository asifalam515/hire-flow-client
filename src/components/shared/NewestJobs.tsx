'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2 } from 'lucide-react';
import { JobCard, JobItem } from '@/components/shared/JobCard';
import { apiClient } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
function formatJobToJobItem(job: any): JobItem {
  const colors = [
    { bg: 'bg-gradient-to-tr from-cyan-500 to-rose-500 text-white', color: 'text-white' },
    { bg: 'bg-red-600', color: 'text-amber-400 font-extrabold' },
    { bg: 'bg-rose-500', color: 'text-white font-extrabold' },
    { bg: 'bg-zinc-100 dark:bg-zinc-800', color: 'text-foreground font-black tracking-widest text-base' },
    { bg: 'bg-gradient-to-tr from-blue-500 to-rose-500 text-white', color: 'text-white font-black' },
    { bg: 'bg-amber-100 dark:bg-amber-950/60', color: 'text-amber-700 dark:text-amber-300 font-black' }
  ];
  let hash = 0;
  const str = job.company?.name || 'Company';
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const colorStyle = colors[Math.abs(hash) % colors.length];

  return {
    id: job.id,
    company: job.company?.name || 'Unknown',
    role: job.title,
    tags: [job.nature, ...(job.employmentTypes || []), job.category].filter(Boolean).slice(0, 3),
    location: job.locationCity || 'Remote',
    salary: `$${(job.minSalary / 1000).toFixed(0)}k - $${(job.maxSalary / 1000).toFixed(0)}k / Year`,
    postedAt: formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }),
    logoBg: colorStyle.bg,
    logoColor: colorStyle.color,
    logoText: str.substring(0, 2).toUpperCase(),
    logoUrl: job.company?.logoUrl
  };
}

export function NewestJobs() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await apiClient.get<{ jobs: any[] }>('/jobs?limit=6');
        const jobsData = res.data?.jobs || (res.data as any).data?.jobs || (Array.isArray(res.data) ? res.data : []);
        setJobs(jobsData.slice(0, 6).map(formatJobToJobItem));
      } catch (error) {
        console.error('Failed to fetch newest jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 linear-canvas linear-grid border-t border-slate-200/80 dark:border-white/[0.06] transition-colors">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full linear-pill text-xs font-semibold text-slate-600 dark:text-[#8a8f98]">
              <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Real-Time Job Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#f7f8f8]">
              Featured Positions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#8a8f98] font-normal">
              High-growth engineering, product, and AI roles with verified salary bands.
            </p>
          </div>

          <Link
            href="/jobs"
            className="group inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-slate-700 dark:text-[#8a8f98] hover:text-slate-900 dark:hover:text-[#f7f8f8] px-3.5 py-2 rounded-lg linear-card linear-card-hover transition-colors"
          >
            <span>View all 15+ jobs</span>
            <ChevronRight className="size-4 transition-transform duration-160 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* 3-Column Responsive Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>

      </div>
    </section>
  );
}
