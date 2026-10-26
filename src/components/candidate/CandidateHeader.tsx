'use client';

import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname, useRouter } from 'next/navigation';
import { NotificationDropdown } from '../shared/NotificationDropdown';
import { ThemeToggle } from '../shared/ThemeToggle';
import { UserProfileMenu } from '../shared/UserProfileMenu';

export function CandidateHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const getPageTitle = () => {
    if (pathname.includes('/settings')) return { title: 'Account Settings', subtitle: 'Manage your profile preferences and account security' };
    if (pathname.includes('/resume')) return { title: 'My Resume', subtitle: 'Manage your verified resume, skills and experience details' };
    if (pathname.includes('/notifications')) return { title: 'Notifications', subtitle: 'View your latest updates, interview alerts and invitations' };
    if (pathname.includes('/messages')) return { title: 'Messages', subtitle: 'Chat with recruiters and hiring managers in real time' };
    if (pathname.includes('/activity')) return { title: 'Application Activity', subtitle: 'Track your application status and saved jobs' };
    return { title: 'Dashboard', subtitle: 'Here is your daily activity and career updates' };
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="h-20 lg:h-24 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 shrink-0 border-b border-slate-100 dark:border-zinc-800">
      
      {/* Title Area & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-zinc-900 cursor-pointer"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h1>
          <p className="hidden md:block text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Actions Area */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-64 lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs or skills..."
            className="block w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-xs transition-colors"
          />
          <button type="submit" aria-label="Submit search" className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
            <Search className="h-4 w-4" />
          </button>
        </form>
        
        {/* Mobile Search Icon */}
        <button 
          onClick={() => router.push('/jobs')}
          aria-label="Find jobs"
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl dark:text-slate-400 dark:hover:bg-zinc-900 cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>
        
        {/* Theme Toggle */}
        <ThemeToggle variant="icon-button" />

        {/* Notification Dropdown */}
        <NotificationDropdown />
        
        {/* User Profile Dropdown Menu */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
