'use client';

import React, { useEffect } from 'react';
import { JobSearchBar } from '@/components/candidate/jobs/JobSearchBar';
import { JobFiltersSidebar } from '@/components/candidate/jobs/JobFiltersSidebar';
import { JobCard } from '@/components/candidate/jobs/JobCard';
import { Pagination } from '@/components/candidate/jobs/Pagination';
import { useJobStore } from '@/store/useJobStore';
import { formatDistanceToNow } from 'date-fns';

export default function FindJobsPage() {
  const { jobs, isLoading, error, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto w-full min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans">
      
      {/* Search Bar - Center Top */}
      <div className="flex justify-center mb-8">
        <JobSearchBar />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar */}
        <JobFiltersSidebar />
        
        {/* Right Content */}
        <div className="flex-1 w-full flex flex-col min-h-[500px]">
          
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="flex-1 flex items-center justify-center flex-col gap-2 text-slate-500">
              <p>{error}</p>
              <button 
                onClick={() => fetchJobs()} 
                className="text-blue-600 font-bold hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center flex-col gap-2 text-slate-500">
              <p>No jobs found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobs.map((job: any) => {
                  const tags = [];
                  if (job.nature) tags.push(job.nature);
                  if (job.employmentTypes && job.employmentTypes.length > 0) {
                    tags.push(...job.employmentTypes);
                  }

                  return (
                    <JobCard 
                      key={job.id}
                      companyLogo={job.company?.logoUrl || ''}
                      companyName={job.company?.name || 'Unknown Company'}
                      title={job.title}
                      tags={tags}
                      location={job.locationCity || 'Remote'}
                      salary={`$${(job.minSalary / 1000).toFixed(0)}k - $${(job.maxSalary / 1000).toFixed(0)}k`}
                      timePosted={formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}
                    />
                  );
                })}
              </div>
              
              <Pagination />
            </>
          )}

        </div>
      </div>
      
    </div>
  );
}
