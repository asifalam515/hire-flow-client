import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { EmployerSignUpWizard } from '@/components/shared/EmployerSignUpWizard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiter & Employer Sign Up | Hire Flow & Hire-Flow',
  description: 'Create your employer account, upload company information, and verify your email to begin hiring elite candidates.',
};

export default function EmployerSignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-zinc-950 font-sans transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="animate-in fade-in duration-500">
          <EmployerSignUpWizard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
