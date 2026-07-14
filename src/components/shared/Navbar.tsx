'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Search, Bell, LogIn, LogOut } from 'lucide-react';

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
  const { user, isAuthenticated, logout, activeRole, setActiveRole } = useAuthStore();

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

          <div className="hidden sm:block h-5 w-px bg-border/80" />

          {/* Role Switcher Pill */}
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

          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <span className="hidden xl:inline-block text-xs font-semibold text-muted-foreground bg-blue-50 dark:bg-muted px-3 py-1 rounded-full">
                {user.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="rounded-xl border-border/80 hover:bg-destructive/10 hover:text-destructive font-semibold transition-all flex items-center gap-1.5 h-9"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
