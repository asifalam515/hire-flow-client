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
    <section className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#EFF5FF] dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header with Title and 'More >' Action */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end mb-12">
          
          <div className="text-center sm:text-left space-y-2 flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              Newest Jobs For You
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-medium">
              Get the fastest application so that your name is above other
            </p>
          </div>

          <Link
            href="/jobs"
            className="group flex items-center gap-1 font-bold text-sm sm:text-base text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/40"
          >
            <span>More</span>
            <ChevronRight className="size-4.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3-Column Responsive Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
