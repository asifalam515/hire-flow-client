'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  FileText, 
  Briefcase, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Sliders
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface UserProfileMenuProps {
  className?: string;
}

export function UserProfileMenu({ className = '' }: UserProfileMenuProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const isRecruiter = user.role === 'RECRUITER';
  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : (user.company?.name || user.email.split('@')[0]);

  const avatarUrl = user.company?.logoUrl || user.avatarUrl;
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    router.push('/login');
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User account menu"
        className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800/80 border border-transparent hover:border-slate-200 dark:hover:border-zinc-700/60 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <div className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0 border border-white/20">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="size-full object-cover" />
          ) : (
            <span>{initial}</span>
          )}
        </div>

        <div className="hidden md:flex flex-col text-left pr-1 min-w-0 max-w-[130px]">
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
            {displayName}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium truncate leading-tight">
            {isRecruiter ? 'Employer' : 'Candidate'}
          </span>
        </div>

        <ChevronDown className={`size-3.5 text-slate-400 transition-transform duration-200 hidden sm:block ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-64 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/15 dark:shadow-black/60 p-2 z-50 text-xs animate-in fade-in zoom-in-95">
          {/* Header Info */}
          <div className="px-3 py-2.5 mb-1.5 border-b border-slate-100 dark:border-zinc-800/80">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-white text-sm truncate">
                {displayName}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                isRecruiter 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40' 
                  : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40'
              }`}>
                {user.role}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 truncate">
              {user.email}
            </p>
          </div>

          {/* Navigation Items */}
          <div className="space-y-0.5 py-1">
            {isRecruiter ? (
              <>
                <Link
                  href="/employer/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Briefcase className="size-4 text-blue-600 dark:text-blue-400" />
                  Dashboard
                </Link>
                <Link
                  href="/employer/dashboard/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <ShieldCheck className="size-4 text-slate-400" />
                  Company Profile
                </Link>
                <Link
                  href="/employer/dashboard/post-job"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Sliders className="size-4 text-slate-400" />
                  Post a Job
                </Link>
                <Link
                  href="/employer/dashboard/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Settings className="size-4 text-slate-400" />
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/candidates/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Briefcase className="size-4 text-blue-600 dark:text-blue-400" />
                  Dashboard
                </Link>
                <Link
                  href="/candidates/dashboard/resume"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <FileText className="size-4 text-slate-400" />
                  My Resume
                </Link>
                <Link
                  href="/candidates/dashboard/activity"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Sliders className="size-4 text-slate-400" />
                  Activity & Saved
                </Link>
                <Link
                  href="/candidates/dashboard/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                >
                  <Settings className="size-4 text-slate-400" />
                  Settings
                </Link>
              </>
            )}
          </div>

          {/* Theme Row */}
          <div className="flex items-center justify-between px-3 py-2 my-1 border-t border-b border-slate-100 dark:border-zinc-800/80">
            <span className="text-slate-500 dark:text-zinc-400 font-medium text-[11px]">Theme</span>
            <ThemeToggle variant="icon-button" />
          </div>

          {/* Logout Action */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold transition-colors cursor-pointer text-left"
          >
            <LogOut className="size-4 text-red-500" />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}
