import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { PostJobForm } from '@/components/employer/PostJobForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a Job | Hire Flow',
  description: 'Post a new job opening to find the best talent.',
};

export default function PostJobPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post a Job</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Find the best talent for your company</p>
        </div>
        
        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <PostJobForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
