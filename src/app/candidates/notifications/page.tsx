'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  MessageSquare, 
  Settings, 
  Activity, 
  LogOut, 
  HelpCircle,
  Search,
  MoreHorizontal,
  Star,
  Mail,
  ChevronLeft
} from 'lucide-react';
import { apiClient } from '@/lib/api';

interface NotificationData {
  id: string;
  type: string;
  title: string;
  content: string;
  isRead: boolean;
  actionUrl: string | null;
  createdAt: string;
}

const getTagConfig = (type: string) => {
  switch (type) {
    case 'NEW_JOB': return { text: 'New job', colorClass: 'text-blue-500 border-blue-500' };
    case 'APPLICATION_UPDATE': return { text: 'Apply Result', colorClass: 'text-emerald-500 border-emerald-500' };
    case 'MESSAGE': return { text: 'Message', colorClass: 'text-red-500 border-red-500' };
    default: return { text: 'System', colorClass: 'text-slate-500 border-slate-500' };
  }
};

export default function NotificationsDashboard() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        let url = '/notifications';
        if (activeFilter !== 'All') {
          let filterType = '';
          if (activeFilter === 'New job') filterType = 'NEW_JOB';
          if (activeFilter === 'Messages') filterType = 'MESSAGE';
          if (activeFilter === 'Apply Result') filterType = 'APPLICATION_UPDATE';
          url += `?filterType=${filterType}`;
        }
        
        const [notifRes, countRes] = await Promise.all([
          apiClient.get<NotificationData[]>(url),
          apiClient.get<{count: number}>('/notifications/unread-count')
        ]);
        
        setNotifications(notifRes.data || []);
        setUnreadCount(countRes.data?.count || 0);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotifications();
  }, [activeFilter]);

  const markAsRead = async (id: string, actionUrl: string | null) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`, {});
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      if (actionUrl) {
        window.location.href = actionUrl;
      }
    } catch (err) {
      console.error('Failed to mark read', err);
    }
  };

  const renderTag = (type: string) => {
    const { text, colorClass } = getTagConfig(type);
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${colorClass}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col hidden lg:flex">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            U
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Joblin</h2>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
          <button className="ml-auto text-slate-400 hover:text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-2">
          <p className="text-xs font-semibold text-slate-400 mb-4">Main</p>
          
          <nav className="space-y-2">
            <Link href="/candidates/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <LayoutDashboard className="w-5 h-5 text-slate-400" />
              Dashboard
            </Link>
            <Link href="/cv-builder" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <FileText className="w-5 h-5 text-slate-400" />
              Candidate profile
            </Link>
            <Link href="/candidates/applications" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <Activity className="w-5 h-5 text-slate-400" />
              My applications
            </Link>
            <Link href="/candidates/notifications" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-900 bg-slate-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-slate-600" />
              Notification
              {unreadCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </Link>
            <Link href="/candidates/messages" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <MessageSquare className="w-5 h-5 text-slate-400" />
              Message
            </Link>
            <Link href="/candidates/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
              Account setting
            </Link>
          </nav>
        </div>

        <div className="mt-auto px-6 pb-8 space-y-2">
          <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-500 rounded-xl hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5" />
            Log out
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-slate-50 transition-colors">
            <HelpCircle className="w-5 h-5 text-slate-400" />
            Help
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB]">
        
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-[#F9FAFB]">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notification</h1>
            <p className="text-sm text-slate-500 mt-1">Updating your information will offer you the most relevent content</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search" 
                className="w-64 pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#F9FAFB]">
                  {unreadCount}
                </span>
              </button>

              {/* Dropdown Popover */}
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-3 w-[400px] bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                  <div className="p-2">
                    <div className="flex items-center gap-2 p-3 border-b border-slate-100">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
                      <div className="flex gap-2 ml-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md">All</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50">New job</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50">Messages</button>
                        <button className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-semibold rounded-md hover:bg-slate-50">Apply Result</button>
                      </div>
                    </div>
                    
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.slice(0, 4).map(notif => (
                        <div 
                          key={notif.id} 
                          onClick={() => markAsRead(notif.id, notif.actionUrl)}
                          className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer relative ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <p className={`text-sm text-slate-800 line-clamp-2 pr-16 mb-2 ${!notif.isRead ? 'font-semibold' : ''}`}>
                            {notif.content}
                          </p>
                          {renderTag(notif.type)}
                          <span className="absolute bottom-4 right-4 text-xs text-slate-400">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-sm text-slate-500 text-center py-4">No recent notifications</p>
                      )}
                    </div>
                    
                    <button className="w-full p-3 text-sm font-semibold text-blue-600 hover:bg-slate-50 flex items-center justify-center gap-1 transition-colors">
                      View all <span className="text-lg leading-none">›</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <img 
                src="https://i.pravatar.cc/150?u=kathryn" 
                alt="Profile" 
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Kathryn Murphy</p>
                <p className="text-xs text-slate-500">Kathrynmurphy@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="px-8 pb-8 flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full">
            
            {/* Top Bar */}
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3 text-slate-800 font-medium">
                <Bell className="w-5 h-5 text-slate-600" />
                <p>You have <span className="text-blue-600 font-semibold">{unreadCount} unread notifications</span> today.</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600 p-1">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 px-6 flex items-center gap-6 border-b border-slate-100">
              <input type="checkbox" className="w-[18px] h-[18px] rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              
              <div className="flex gap-2">
                {['All', 'New job', 'Messages', 'Apply Result'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="flex flex-col">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <span className="text-sm text-slate-500">Loading notifications...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex justify-center py-10">
                  <span className="text-sm text-slate-500">You're all caught up!</span>
                </div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif.id} 
                    onClick={() => markAsRead(notif.id, notif.actionUrl)}
                    className={`flex items-start gap-6 p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors group cursor-pointer ${!notif.isRead ? 'bg-blue-50/20' : ''}`}
                  >
                    <div className="pt-1">
                      <input 
                        type="checkbox" 
                        checked={!notif.isRead}
                        readOnly
                        className="w-[18px] h-[18px] rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-8">
                      <p className={`text-[15px] leading-relaxed mb-3 pr-12 ${!notif.isRead ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>
                        {notif.content}
                      </p>
                      {renderTag(notif.type)}
                    </div>

                    <div className="flex flex-col items-end justify-between h-full gap-4 shrink-0">
                      <div className="flex items-center gap-3">
                        <button className="text-slate-400 hover:text-yellow-400 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <Mail className="w-5 h-5" />
                        </button>
                      </div>
                      <span className="text-[13px] font-medium text-slate-400">
                        {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
