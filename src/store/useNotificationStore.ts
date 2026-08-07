import { create } from 'zustand';
import { apiClient } from '@/lib/api';

export interface Notification {
  id: string;
  userId: string;
  type: 'NEW_JOB' | 'APPLICATION_UPDATE' | 'MESSAGE' | 'SYSTEM';
  title: string;
  content: string;
  isRead: boolean;
  actionUrl: string | null;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isDropdownOpen: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  isDropdownOpen: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await apiClient.get('/notifications');
      const data = response.data?.data || [];
      const unreadCount = data.filter((n: Notification) => !n.isRead).length;
      set({ notifications: data, unreadCount, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await apiClient.patch(`/notifications/${id}/read`);
      const { notifications } = get();
      const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
      const unreadCount = updated.filter(n => !n.isRead).length;
      set({ notifications: updated, unreadCount });
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  },

  markAllAsRead: async () => {
    try {
      // If there's an API for mark all as read:
      // await apiClient.patch('/notifications/read-all');
      
      // Fallback: update local state
      const { notifications } = get();
      const updated = notifications.map(n => ({ ...n, isRead: true }));
      set({ notifications: updated, unreadCount: 0 });
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  },

  toggleDropdown: () => {
    set((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
  },

  closeDropdown: () => {
    set({ isDropdownOpen: false });
  },

  addNotification: (notification: Notification) => {
    const { notifications, unreadCount } = get();
    set({ 
      notifications: [notification, ...notifications],
      unreadCount: unreadCount + 1
    });
  }
}));
