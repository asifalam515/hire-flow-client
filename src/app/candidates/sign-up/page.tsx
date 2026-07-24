import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { CandidateSignUpForm } from '@/components/shared/CandidateSignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Sign Up | Hire Flow & Hire-Flow',
  description: 'Create your candidate account to find the perfect job and track your applications.',
};

export default function CandidateSignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <CandidateSignUpForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
