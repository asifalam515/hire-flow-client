import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JobCard, JobItem } from '@/components/shared/JobCard';

const NEWEST_JOBS: JobItem[] = [
  {
    id: 'mim-president',
    company: 'MIM',
    role: 'President of Sales',
    tags: ['Full-Time', 'Remote'],
    location: 'Korstø',
    salary: '25 25$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-gradient-to-tr from-cyan-500 to-rose-500 text-white',
    logoColor: 'text-white',
    logoText: 'M',
  },
  {
    id: 'mcdonalds-web',
    company: "McDonald's",
    role: 'Web Designer',
    tags: ['Full-Time', 'Senior'],
    location: 'Bergen',
    salary: '25 35$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-red-600',
    logoColor: 'text-amber-400 font-extrabold',
    logoText: 'M',
  },
  {
    id: 'loveclip-nursing',
    company: 'LOVECLIP',
    role: 'Nursing Assistant',
    tags: ['Full-Time', 'Part-Time'],
    location: 'Trondheim',
    salary: '25 55$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-rose-500',
    logoColor: 'text-white font-extrabold',
    logoText: '♥',
    defaultActionsVisible: true,
  },
  {
    id: 'tyme-marketing',
    company: 'TYME',
    role: 'Marketing Coordinator',
    tags: ['Hybrid', 'Part-Time'],
    location: 'Stavanger',
    salary: '25 15$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-zinc-100 dark:bg-zinc-800',
    logoColor: 'text-foreground font-black tracking-widest text-base',
    logoText: 'TYME',
  },
  {
    id: 'ob-dog-trainer',
    company: 'OB',
    role: 'Dog Trainer',
    tags: ['Junior', 'Part-Time'],
    location: 'Mongstad',
    salary: '25 45$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-gradient-to-tr from-blue-500 to-rose-500 text-white',
    logoColor: 'text-white font-black',
    logoText: 'OB',
  },
  {
    id: 'taint-medical',
    company: 'TAINT',
    role: 'Medical Assistant',
    tags: ['Mid-Level', 'Part-Time'],
    location: 'Bergen',
    salary: '25 95$ / Month',
    postedAt: '1 hour ago',
    logoBg: 'bg-amber-100 dark:bg-amber-950/60',
    logoColor: 'text-amber-700 dark:text-amber-300 font-black',
    logoText: 'T',
  },
];

export function NewestJobs() {
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
          {NEWEST_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
}
