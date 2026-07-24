'use client';

import React, { useState } from 'react';
import { EmployerSidebar } from '@/components/employer/EmployerSidebar';
import { EmployerHeader } from '@/components/employer/EmployerHeader';

export default function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with mobile transformation */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <EmployerSidebar onMobileClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        <EmployerHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
