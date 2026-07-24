'use client';

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User,
  PlusSquare,
  Bell,
  MessageSquare,
  Settings,
  Sliders,
  LogOut,
  HelpCircle,
  X
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export function EmployerSidebar({ onMobileClose }: { onMobileClose?: () => void }) {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', href: '/employer/dashboard', icon: LayoutDashboard },
    { name: 'Employer profile', href: '/employer/dashboard/profile', icon: User },
    { name: 'Post Job', href: '/employer/dashboard/post-job', icon: PlusSquare },
    { name: 'Notification', href: '/employer/dashboard/notifications', icon: Bell, badge: 6 },
    { name: 'Message', href: '/employer/dashboard/messages', icon: MessageSquare, badge: 24 },
    { name: 'Account Setting', href: '/employer/dashboard/settings', icon: Settings },
    { name: 'Manage hiring', href: '/employer/dashboard/hiring', icon: Sliders },
  ];

  return (
    <aside className="w-[280px] bg-white dark:bg-zinc-950 border-r border-slate-100 dark:border-zinc-800 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo & Close Button */}
      <div className="h-20 lg:h-24 flex items-center justify-between px-6 lg:px-8 border-b border-slate-100 dark:border-zinc-800">
        <Link href="/employer/dashboard" className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="font-bold text-xl">H</span>
          </div>
          <div>
            <span className="font-bold text-xl text-slate-900 dark:text-white leading-tight block">Hire Flow</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Employer</span>
          </div>
        </Link>
        <button 
          onClick={onMobileClose}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg dark:hover:bg-zinc-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4">
          Main Menu
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileClose}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-900/50 dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                {item.name}
              </div>
              
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="px-4 py-6 mt-auto">
        <button className="flex w-full items-center gap-4 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <LogOut className="w-5 h-5" />
          Log out
        </button>
        <button className="flex w-full items-center gap-4 px-4 py-3 mt-1 rounded-xl font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-zinc-900/50 transition-colors">
          <HelpCircle className="w-5 h-5 text-slate-500" />
          Help
        </button>
      </div>
    </aside>
  );
}
