import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User } from '@/types';
import { apiClient } from '@/lib/api';

interface LoginCredentials {
  email: string;
  password?: string;
}

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  activeRole: 'candidate' | 'employer';

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveRole: (role: 'candidate' | 'employer') => void;
  login: (credentials: LoginCredentials) => Promise<User | null>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<User | null>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial State
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        activeRole: 'candidate',

        // Atomic Setters
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            error: null,
          }),

        setLoading: (isLoading) => set({ isLoading }),

        setError: (error) => set({ error }),

        setActiveRole: (activeRole) => set({ activeRole }),

        clearError: () => set({ error: null }),

        // Async Actions
        login: async (credentials: LoginCredentials) => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<{ user: User }>('/auth/login', credentials);
            const user = response.data?.user || (response.data as unknown as User);

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return user;
          } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: errorMessage,
            });
            throw error;
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            await apiClient.post('/auth/logout');
          } catch (err) {
            console.error('Logout error:', err);
          } finally {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        },

        checkAuth: async () => {
          set({ isLoading: true });
          try {
            const response = await apiClient.get<{ user: User }>('/auth/me');
            const user = response.data?.user || (response.data as unknown as User);

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return user;
          } catch (error) {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return null;
          }
        },
      }),
      {
        name: 'hire-flow-auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          activeRole: state.activeRole,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);
