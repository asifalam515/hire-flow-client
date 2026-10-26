'use client';

import React, { useState } from 'react';
import { Search, Plus, Menu } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname, useRouter } from 'next/navigation';
import { NotificationDropdown } from '../shared/NotificationDropdown';
import { ThemeToggle } from '../shared/ThemeToggle';
import { UserProfileMenu } from '../shared/UserProfileMenu';

export function EmployerHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    if (pathname.includes('/post-job')) return { title: 'Post a Job', subtitle: 'Create and publish job listings to attract top verified talent' };
    if (pathname.includes('/profile')) return { title: 'Company Profile', subtitle: 'Manage your organization branding, perks and culture' };
    if (pathname.includes('/settings')) return { title: 'Account Settings', subtitle: 'Manage company access, team members and billing' };
    if (pathname.includes('/messages')) return { title: 'Candidate Messages', subtitle: 'Real-time conversation with active applicants' };
    if (pathname.includes('/notifications')) return { title: 'Notifications', subtitle: 'System updates and applicant status changes' };
    if (pathname.includes('/jobs')) return { title: 'Applicant Pipeline', subtitle: 'Review, screen, and interview candidates for this role' };
    return { title: 'Employer Dashboard', subtitle: 'Real-time overview of active jobs, applicant counts and team velocity' };
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="h-20 lg:h-24 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-20">
      
      {/* Title & Mobile Menu Area */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-zinc-800 cursor-pointer"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h2>
          <p className="hidden md:block text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-3 lg:gap-4">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-56 lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates or jobs..."
            className="w-full bg-slate-50/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white text-xs rounded-xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors placeholder:text-slate-400"
          />
          <button type="submit" aria-label="Submit search" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <Search className="w-4 h-4" />
          </button>
        </form>
        
        {/* Mobile Search Icon */}
        <button 
          onClick={() => router.push('/jobs')}
          aria-label="Find jobs"
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Post Job Button */}
        <Link href="/employer/dashboard/post-job">
          <button className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3.5 py-2 rounded-xl font-bold text-xs transition-all shadow-md shadow-blue-600/20 cursor-pointer">
            <Plus className="w-4 h-4" />
            Post a Job
          </button>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle variant="icon-button" />

        {/* Notifications & Profile */}
        <NotificationDropdown />
        
        {/* User Profile Dropdown Menu */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
