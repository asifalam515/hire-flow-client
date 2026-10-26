'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className = '',
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/40 ${
        compact ? 'p-5 sm:p-6' : 'p-8 sm:p-12'
      } ${className}`}
    >
      {/* Icon Capsule with ambient soft glow */}
      <div
        className={`flex items-center justify-center rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-100/80 dark:border-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm ${
          compact ? 'size-10 mb-2.5' : 'size-13 mb-3.5'
        }`}
      >
        <Icon className={compact ? 'size-5' : 'size-6'} />
      </div>

      {/* Content */}
      <h3
        className={`font-bold text-slate-900 dark:text-white tracking-tight ${
          compact ? 'text-sm' : 'text-base sm:text-lg'
        }`}
      >
        {title}
      </h3>

      {description && (
        <p
          className={`text-slate-500 dark:text-zinc-400 mt-1 max-w-sm ${
            compact ? 'text-xs' : 'text-xs sm:text-sm'
          }`}
        >
          {description}
        </p>
      )}

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
          {action && action.href && (
            <Link
              href={action.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>{action.label}</span>
              {action.icon ? (
                <action.icon className="size-3.5" />
              ) : (
                <ArrowRight className="size-3.5" />
              )}
            </Link>
          )}

          {action && action.onClick && (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>{action.label}</span>
              {action.icon ? (
                <action.icon className="size-3.5" />
              ) : (
                <ArrowRight className="size-3.5" />
              )}
            </button>
          )}

          {secondaryAction && secondaryAction.href && (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700/60 font-medium text-xs transition-colors cursor-pointer"
            >
              {secondaryAction.label}
            </Link>
          )}

          {secondaryAction && secondaryAction.onClick && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700/60 font-medium text-xs transition-colors cursor-pointer"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
