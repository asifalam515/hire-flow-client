import React from 'react';
import { Metadata } from 'next';
import { EmployerProfileForm } from '@/components/employer/EmployerProfileForm';

export const metadata: Metadata = {
  title: 'Employer Profile | Hire Flow',
  description: 'Manage your company profile and details',
};

export default function EmployerProfilePage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Employer Profile</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your personal and company information</p>
      </div>
      
      <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500">
        <EmployerProfileForm />
      </div>
    </div>
  );
}
