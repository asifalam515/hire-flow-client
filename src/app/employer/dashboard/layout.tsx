import React from 'react';
import { EmployerSidebar } from '@/components/employer/EmployerSidebar';
import { EmployerHeader } from '@/components/employer/EmployerHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employer Dashboard | Hire Flow & Hire-Flow',
  description: 'Manage your job postings, applications, and messages.',
};

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-900 overflow-hidden font-sans">
      <EmployerSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <EmployerHeader />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
