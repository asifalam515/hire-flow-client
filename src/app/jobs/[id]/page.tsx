'use client';

import React, { useEffect } from 'react';
import { Bookmark, Clock, Calendar, MapPin, DollarSign, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useJobStore } from '@/store/useJobStore';
import { JobCard } from '@/components/candidate/jobs/JobCard';
import { formatDistanceToNow } from 'date-fns';

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const { selectedJob: job, similarJobs, isLoading, error, fetchJobById, fetchSimilarJobs } = useJobStore();

  useEffect(() => {
    if (id) {
      fetchJobById(id);
    }
  }, [id, fetchJobById]);

  useEffect(() => {
    if (job?.category && job.id) {
      fetchSimilarJobs(job.category, job.id);
    }
  }, [job?.category, job?.id, fetchSimilarJobs]);

  if (isLoading || !job) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[600px]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] text-slate-600">
        <p className="text-xl font-medium">{error}</p>
        <Link href="/jobs" className="mt-4 text-blue-600 hover:underline">
          &larr; Back to jobs
        </Link>
      </div>
    );
  }

  // Generate tags dynamically
  const tags = [];
  if (job.nature) tags.push(job.nature);
  if (job.employmentTypes && job.employmentTypes.length > 0) {
    tags.push(...job.employmentTypes);
  }
  if (job.candidateExperience && job.candidateExperience.length > 0) {
    tags.push(...job.candidateExperience);
  }

  // Parse strings into arrays for bullet points
  const requirementsList = job.requirements ? job.requirements.split('\n').filter((item: string) => item.trim() !== '') : [];
  const responsibilitiesList = job.responsibilities ? job.responsibilities.split('\n').filter((item: string) => item.trim() !== '') : [];
  const benefitsList = job.benefits || [];

  return (
    <div className="max-w-[1200px] mx-auto w-full p-4 lg:p-8">
      {/* Main Container */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 lg:p-10 shadow-sm">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 items-start">
          
          <div className="flex flex-col md:flex-row gap-6 items-start flex-1">
            {/* Company Logo */}
            <div className="w-24 h-24 shrink-0 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center p-4 border border-slate-100 dark:border-zinc-700">
              {job.company?.logoUrl ? (
                <img src={job.company.logoUrl} alt={`${job.company?.name} logo`} className="w-full h-full object-contain" />
              ) : (
                <span className="text-3xl font-bold text-slate-300">{job.company?.name?.charAt(0) || 'C'}</span>
              )}
            </div>
            
            {/* Job Title & Actions */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-blue-600">{job.company?.name || 'Unknown Company'}</span>
                <div className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                {job.title}
                <Bookmark className="w-5 h-5 text-blue-600 cursor-pointer hover:fill-blue-50 transition-colors" />
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed max-w-2xl line-clamp-2">
                {job.description}
              </p>
              
              <div className="flex gap-4 mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition-colors">
                  Apply Now
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-2.5 rounded-lg font-medium transition-colors">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-slate-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-700 w-full lg:w-[300px] shrink-0 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden mb-3">
              <img src="https://i.pravatar.cc/150?img=47" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
              <span className="text-blue-600">5%</span> of Your Resume is Complete
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              About 3 out of 5 resumes that are incomplete...
            </p>
            <Link href="/profile" className="text-sm text-blue-600 font-medium hover:underline">
              Complete your resume
            </Link>
          </div>

        </div>

        <hr className="my-8 border-slate-200 dark:border-zinc-800" />

        {/* Quick Info Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{job.employmentTypes?.join(', ') || 'Any'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Employment Type</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:border-l border-slate-200 dark:border-zinc-800 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{job.yearsOfExperience || 'Any'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Experience Level</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:border-l border-slate-200 dark:border-zinc-800 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{job.locationCity || 'Remote'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Location</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:border-l border-slate-200 dark:border-zinc-800 md:pl-6">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <DollarSign className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">
                {job.minSalary ? `$${(job.minSalary / 1000).toFixed(0)}k` : 'N/A'} - {job.maxSalary ? `$${(job.maxSalary / 1000).toFixed(0)}k` : 'N/A'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Salary</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200 dark:border-zinc-800" />

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Job Description (Responsibilities) */}
        {responsibilitiesList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Job Responsibilities</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              {responsibilitiesList.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {requirementsList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Requirements</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              {requirementsList.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* What we offer */}
        {benefitsList.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">What we offer</h2>
            <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
              {benefitsList.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* About Company */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">About Company</h2>
            <Link href={`/companies/${job.company?.slug || '#'}`} className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline">
              More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {job.company?.description || 'No description provided by the company.'}
          </p>
        </div>

        {/* Similar Jobs */}
        {similarJobs.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Similar jobs</h2>
              <Link href={`/jobs?category=${job.category}`} className="text-sm font-medium text-blue-600 flex items-center gap-1 hover:underline">
                More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {similarJobs.map((simJob: any) => {
                const simTags = [];
                if (simJob.nature) simTags.push(simJob.nature);
                if (simJob.employmentTypes && simJob.employmentTypes.length > 0) {
                  simTags.push(...simJob.employmentTypes);
                }

                return (
                  <JobCard 
                    key={simJob.id}
                    id={simJob.id}
                    companyLogo={simJob.company?.logoUrl || ''}
                    companyName={simJob.company?.name || 'Unknown'}
                    title={simJob.title}
                    tags={simTags}
                    location={simJob.locationCity || 'Remote'}
                    salary={`$${(simJob.minSalary / 1000).toFixed(0)}k - $${(simJob.maxSalary / 1000).toFixed(0)}k`}
                    timePosted={formatDistanceToNow(new Date(simJob.createdAt), { addSuffix: true })}
                  />
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
