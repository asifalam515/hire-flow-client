'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  variant?: 'dropdown' | 'icon-button';
}

export function ThemeToggle({ className = '', variant = 'icon-button' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={`size-9 rounded-xl bg-slate-100 dark:bg-zinc-800/80 animate-pulse ${className}`} />
    );
  }

  if (variant === 'icon-button') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Theme: ${theme} (${resolvedTheme}). Click to switch.`}
        className={`relative size-9 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400/50 dark:hover:border-zinc-700 transition-all duration-200 flex items-center justify-center shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer ${className}`}
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="size-4 transition-transform duration-300 rotate-0 hover:-rotate-12 text-blue-400" />
        ) : (
          <Sun className="size-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-500" />
        )}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select theme preference"
        className="size-9 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:border-blue-400/60 dark:hover:border-zinc-700 flex items-center justify-center transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="size-4 text-blue-400" />
        ) : (
          <Sun className="size-4 text-amber-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-black/10 dark:shadow-black/40 py-1.5 z-50 text-xs font-semibold animate-in fade-in zoom-in-95">
          <button
            type="button"
            onClick={() => { setTheme('light'); setIsOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 text-left transition-colors cursor-pointer ${theme === 'light' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-zinc-300'}`}
          >
            <span className="flex items-center gap-2">
              <Sun className="size-3.5 text-amber-500" /> Light
            </span>
            {theme === 'light' && <Check className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => { setTheme('dark'); setIsOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 text-left transition-colors cursor-pointer ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-zinc-300'}`}
          >
            <span className="flex items-center gap-2">
              <Moon className="size-3.5 text-blue-400" /> Dark
            </span>
            {theme === 'dark' && <Check className="size-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => { setTheme('system'); setIsOpen(false); }}
            className={`w-full flex items-center justify-between px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800 text-left transition-colors cursor-pointer ${theme === 'system' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-700 dark:text-zinc-300'}`}
          >
            <span className="flex items-center gap-2">
              <Laptop className="size-3.5 text-slate-400" /> System
            </span>
            {theme === 'system' && <Check className="size-3.5" />}
          </button>
        </div>
      )}
    </div>
  );
}
