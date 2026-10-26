'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useJobStore } from '@/store/useJobStore';
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
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Platform', href: '/' },
  { label: 'Find Jobs', href: '/jobs' },
  { label: 'Companies', href: '/companies' },
  { label: 'CV Builder', href: '/cv-builder' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, activeRole, setActiveRole, updateAvatar } = useAuthStore();
  const { fetchSavedJobs } = useJobStore();
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
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isAuthenticated && (!user?.role || user.role === 'CANDIDATE')) {
      fetchSavedJobs();
    }
  }, [isAuthenticated, user?.role, fetchSavedJobs]);

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
    <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 transition-all duration-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/[0.08] bg-[#08090a]/85 p-2.5 sm:p-3 px-4 sm:px-6 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
        {/* Brand Logo - Linear Style */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="flex items-center justify-center size-8 rounded-lg bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 border border-white/20 shadow-[0_0_16px_rgba(59,130,246,0.45)] group-hover:scale-105 transition-transform duration-160">
            <Sparkles className="size-4 text-white" />
          </div>
          <div className="flex items-center tracking-tight text-xl font-bold text-[#f7f8f8]">
            <span>Hire</span>
            <span className="text-blue-500 ml-0.5">Flow</span>
          </div>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-white/[0.05] text-[#8a8f98] border border-white/[0.08] ml-0.5">
            ATS
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-160 ${
                  isActive
                    ? 'text-[#f7f8f8]'
                    : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions & Auth */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <Link
            href="/jobs"
            aria-label="Search jobs"
            className="hidden sm:flex size-8 items-center justify-center rounded-lg text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all duration-160"
          >
            <Search className="size-3.5" />
          </Link>
          
          {isAuthenticated && (
            <div className="hidden sm:block">
              <NotificationDropdown />
            </div>
          )}

          {/* Role Switcher Pill - shown when not logged in */}
          {!isAuthenticated && (
            <>
              <div className="hidden sm:block h-4 w-px bg-white/[0.08]" />
              <div className="hidden md:flex items-center rounded-lg bg-white/[0.03] p-0.5 border border-white/[0.08] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveRole('candidate')}
                  className={`px-2.5 py-1 rounded-md transition-all duration-160 ${
                    activeRole === 'candidate'
                      ? 'bg-white/[0.1] text-[#f7f8f8] shadow-xs'
                      : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                  }`}
                >
                  Candidate
                </button>
                <button
                  type="button"
                  onClick={() => setActiveRole('employer')}
                  className={`px-2.5 py-1 rounded-md transition-all duration-160 ${
                    activeRole === 'employer'
                      ? 'bg-white/[0.1] text-[#f7f8f8] shadow-xs'
                      : 'text-[#8a8f98] hover:text-[#f7f8f8]'
                  }`}
                >
                  Recruiter
                </button>
              </div>
            </>
          )}

          {isAuthenticated && user ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <div className="h-5 w-px bg-white/[0.08] mr-3 hidden sm:block" />

              {/* Profile Trigger Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-full hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all duration-160 focus:outline-none group cursor-pointer"
              >
                <div className="relative size-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0 overflow-hidden border border-blue-400/30">
                  {isUploadingAvatar ? (
                    <Loader2 className="size-4 animate-spin text-white" />
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
                  <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 border border-[#08090a]" />
                </div>

                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-[#f7f8f8] group-hover:text-blue-400 transition-colors truncate max-w-[140px]">
                    {getDisplayName()}
                  </span>
                  <ChevronDown
                    className={`size-3.5 text-[#8a8f98] transition-transform duration-160 ${
                      isDropdownOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Menu Box */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2.5 w-60 rounded-xl bg-[#0f1011] border border-white/[0.08] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-2.5 border-b border-white/[0.06] mb-1 sm:hidden">
                    <p className="text-xs font-semibold text-[#f7f8f8] truncate">
                      {getDisplayName()}
                    </p>
                    <p className="text-[11px] font-medium text-[#8a8f98] truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="w-full flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group text-left cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingAvatar ? (
                      <Loader2 className="size-3.5 mr-2.5 text-[#8a8f98] animate-spin" />
                    ) : (
                      <Camera className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
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

                  <div className="my-1 border-t border-white/[0.06]" />

                  {isRecruiter ? (
                    <>
                      <Link
                        href="/employer/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <LayoutDashboard className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Employer Dashboard</span>
                      </Link>

                      <Link
                        href="/employer/dashboard/profile"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <Building2 className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Company Profile</span>
                      </Link>

                      <Link
                        href="/employer/dashboard/post-job"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <PlusCircle className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Post New Job</span>
                      </Link>

                      <Link
                        href="/employer/dashboard/messages"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <MessageSquare className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Candidate Chat</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/candidates/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <LayoutDashboard className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Candidate Dashboard</span>
                      </Link>

                      <Link
                        href="/candidates/applications"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <Briefcase className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>My Applications</span>
                      </Link>

                      <Link
                        href="/candidates/dashboard/messages"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-3.5 py-2 text-xs font-medium text-[#8a8f98] hover:bg-white/[0.05] hover:text-[#f7f8f8] transition-colors group"
                      >
                        <MessageSquare className="size-3.5 mr-2.5 text-[#8a8f98] group-hover:text-blue-400 transition-colors" />
                        <span>Recruiter Messages</span>
                      </Link>
                    </>
                  )}

                  <div className="my-1 border-t border-white/[0.06]" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="size-3.5 mr-2.5" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="text-xs sm:text-sm font-medium text-[#8a8f98] hover:text-[#f7f8f8] px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-all duration-160">
                  Log in
                </button>
              </Link>
              <Link
                href={
                  activeRole === 'employer' ? '/employer/sign-up' : '/candidates/sign-up'
                }
              >
                <button className="h-8 sm:h-9 px-3.5 sm:px-4 rounded-lg bg-[#f7f8f8] text-[#08090a] hover:bg-white font-semibold text-xs sm:text-sm shadow-[0_0_16px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.8)] hover:shadow-[0_0_24px_rgba(255,255,255,0.35)] transition-all duration-160 flex items-center gap-1.5 cursor-pointer">
                  <span>Sign up</span>
                  <ArrowRight className="size-3.5" />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
