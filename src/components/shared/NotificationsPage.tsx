'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/store/useNotificationStore';
import { Bell, Check, Trash2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export function NotificationsPage() {
  const { notifications, fetchNotifications, markAsRead, markAllAsRead, isLoading } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button 
            onClick={() => markAllAsRead()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p>Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
            <Bell className="w-12 h-12 mb-4 text-slate-300 dark:text-zinc-700" />
            <p className="text-lg font-medium text-slate-600 dark:text-slate-300">No notifications yet</p>
            <p className="text-sm mt-1 text-slate-500">When you receive notifications, they will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-zinc-800/50">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start transition-colors ${
                  !notification.isRead 
                    ? 'bg-blue-50/50 dark:bg-blue-900/10' 
                    : 'hover:bg-slate-50 dark:hover:bg-zinc-800/30'
                }`}
              >
                <div className={`p-3 rounded-full shrink-0 ${
                  !notification.isRead 
                    ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' 
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400'
                }`}>
                  <Bell className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h3 className={`text-base font-semibold truncate ${
                      !notification.isRead ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {notification.title}
                    </h3>
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <p className={`mt-1 text-sm leading-relaxed ${
                    !notification.isRead ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {notification.content}
                  </p>

                  {notification.actionUrl && (
                    <div className="mt-3">
                      <Link 
                        href={notification.actionUrl}
                        className="inline-flex text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        View Details &rarr;
                      </Link>
                    </div>
                  )}
                </div>
                
                {!notification.isRead && (
                  <div className="shrink-0 self-start sm:self-center ml-auto">
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-full transition-colors tooltip-trigger relative group"
                      title="Mark as read"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
