'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { uploadFileToCloudinary } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Search,
  Bell,
  LogIn,
  LogOut,
  ChevronDown,
  Camera,
  Loader2,
  LayoutDashboard,
  Building2,
  PlusCircle,
  MessageSquare,
  Settings,
  Users,
  Briefcase,
  User as UserIcon,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', active: true },
  { label: 'Find job', href: '/jobs' },
  { label: 'Company', href: '/companies' },
  { label: 'Create CV', href: '/cv-builder' },
];

export function Navbar() {
  const { user, isAuthenticated, logout, activeRole, setActiveRole, updateAvatar } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      const res = await uploadFileToCloudinary(file, 'hire-flow/avatars');
      if (res?.url) {
        await updateAvatar(res.url);
      }
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setIsUploadingAvatar(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isRecruiter = user?.role === 'RECRUITER' || (isAuthenticated && activeRole === 'employer');

  const getDisplayName = () => {
    if (!user) return 'User';
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.company?.name) {
      return user.company.name;
    }
    return user.email.split('@')[0];
  };

  const getAvatarLetter = () => {
    if (!user) return 'U';
    if (user.company?.name) return user.company.name.charAt(0).toUpperCase();
    if (user.firstName) return user.firstName.charAt(0).toUpperCase();
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-blue-200/50 dark:border-border/60 bg-white/90 dark:bg-zinc-900/90 p-3 px-6 shadow-md shadow-blue-900/5 backdrop-blur-md">
        {/* Brand Logo - Hire Flow */}
        <Link href="/" className="flex items-center gap-1.5 group focus:outline-none">
          <div className="flex items-center tracking-tight text-2xl sm:text-3xl font-extrabold text-foreground">
            <span className="text-foreground font-black">Hire</span>
            <span className="text-blue-600 dark:text-blue-500 font-black relative ml-1">
              Flow
              <span className="absolute -top-1 -right-2 size-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-sm font-semibold transition-colors duration-200 ${
                item.active
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions & Auth */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            type="button"
            aria-label="Search jobs"
            className="hidden sm:flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-muted dark:hover:text-foreground transition-all"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="hidden sm:flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-muted dark:hover:text-foreground transition-all relative"
          >
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-zinc-900" />
          </button>

          {/* Role Switcher Pill - shown when not logged in */}
          {!isAuthenticated && (
            <>
              <div className="hidden sm:block h-5 w-px bg-border/80" />
              <div className="hidden md:flex items-center rounded-xl bg-slate-100 dark:bg-zinc-800 p-1 border border-slate-200/80 dark:border-zinc-700/80 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveRole('candidate')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    activeRole === 'candidate'
                      ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('employer')}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    activeRole === 'employer'
                      ? 'bg-white dark:bg-zinc-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Employer
                </button>
              </div>
            </>
          )}

          {isAuthenticated && user ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <div className="h-6 w-px bg-border/80 mr-3.5 hidden sm:block" />

              {/* Profile Trigger Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 sm:pl-1 sm:pr-2.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all focus:outline-none group cursor-pointer"
              >
                {/* Avatar Circle with Online Dot */}
                <div className="relative size-9 sm:size-10 rounded-full bg-red-600 text-white font-extrabold flex items-center justify-center text-base sm:text-lg shadow-sm shrink-0 overflow-hidden border border-red-500/30">
                  {isUploadingAvatar ? (
                    <Loader2 className="size-5 animate-spin text-white" />
                  ) : user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={getDisplayName()}
                      className="size-full object-cover"
                    />
                  ) : user.company?.logoUrl ? (
                    <img
                      src={user.company.logoUrl}
                      alt={user.company.name || 'Logo'}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span>{getAvatarLetter()}</span>
                  )}
                  {/* Green Online Indicator Dot */}
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
                </div>

                {/* Name and Chevron */}
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate max-w-[150px]">
                    {getDisplayName()}
                  </span>
                  <ChevronDown
                    className={`size-4 text-zinc-500 transition-transform duration-200 ${
                      isDropdownOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-56 sm:w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {/* Header info on mobile or quick badge */}
                  <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 mb-1 sm:hidden">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {getDisplayName()}
                    </p>
                    <p className="text-[11px] font-medium text-zinc-500 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="w-full flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group text-left cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="size-4 mr-3 text-zinc-400 animate-spin" />
                    ) : (
                      <Camera className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                    )}
                    <span>Update profile photo</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />

                  <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />

                  {isRecruiter ? (
                    <>
                      <Link
                        href="/jobs"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <LayoutDashboard className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/employer/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Building2 className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Employer profile</span>
                      </Link>

                      <Link
                        href="/employer/jobs/new"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <PlusCircle className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Post job</span>
                      </Link>

                      <Link
                        href="/employer/notifications"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Bell className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Notification</span>
                      </Link>

                      <Link
                        href="/employer/messages"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <MessageSquare className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Message</span>
                      </Link>

                      <Link
                        href="/employer/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Settings className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Account setting</span>
                      </Link>

                      <Link
                        href="/employer/hiring"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Users className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Manage hiring</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/candidates/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <LayoutDashboard className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/cv-builder"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <UserIcon className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Candidate profile</span>
                      </Link>

                      <Link
                        href="/candidates/applications"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Briefcase className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>My applications</span>
                      </Link>

                      <Link
                        href="/candidates/notifications"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Bell className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Notification</span>
                      </Link>

                      <Link
                        href="/candidates/messages"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <MessageSquare className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Message</span>
                      </Link>

                      <Link
                        href="/candidates/settings"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                      >
                        <Settings className="size-4 mr-3 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                        <span>Account setting</span>
                      </Link>
                    </>
                  )}

                  <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center px-4 py-2.5 text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="size-4 mr-3" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="rounded-xl font-semibold px-4 py-2 h-9 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-zinc-800 transition-all duration-200">
                  Log In
                </Button>
              </Link>
              <Link
                href={
                  activeRole === 'employer' ? '/employer/sign-up' : '/candidates/sign-up'
                }
              >
                <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 h-9 shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-200 flex items-center gap-2 text-sm">
                  <LogIn className="size-4" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
