import React from 'react';
import { PostJobForm } from '@/components/employer/PostJobForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a Job | Hire Flow',
  description: 'Post a new job opening to find the best talent.',
};

export default function PostJobPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post a Job</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Find the best talent for your company</p>
      </div>
      
      <div className="bg-white dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <PostJobForm />
      </div>
    </div>
  );
}
