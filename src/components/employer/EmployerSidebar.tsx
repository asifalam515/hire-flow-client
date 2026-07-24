'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut, 
  HelpCircle,
  BriefcaseBusiness
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export function EmployerSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/employer/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', href: '/employer/dashboard/jobs', icon: Briefcase },
    { name: 'Applications', href: '/employer/dashboard/applications', icon: FileText },
    { name: 'Messages', href: '/employer/dashboard/messages', icon: MessageSquare },
    { name: 'Settings', href: '/employer/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-slate-200 dark:border-zinc-800 flex flex-col h-full sticky top-0 shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-zinc-800">
        <Link href="/employer/dashboard" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">Joblin</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.name === 'Jobs' && pathname?.includes('/jobs')) || (item.name === 'Jobs' && pathname?.includes('/post-job'));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-800 space-y-1">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-900 dark:hover:text-white transition-colors">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          Help
        </button>
      </div>
    </aside>
  );
}
