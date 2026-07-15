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
  registerEmployer: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName: string;
    companyField?: string;
    companyDescription: string;
    logoUrl?: string;
  }) => Promise<{ user: User; verification?: { otpCode: string; expiresIn: number } }>;
  verifyOtp: (data: { email: string; otpCode: string }) => Promise<{ verified: boolean; user: User }>;
  resendOtp: (email: string) => Promise<{ verification: { otpCode: string; expiresIn: number } }>;
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
            const response = await apiClient.post<{ user: User; accessToken?: string }>('/auth/login', credentials);
            const user = response.data?.user || (response.data as unknown as User);

            if (typeof window !== 'undefined' && response.data?.accessToken) {
              localStorage.setItem('accessToken', response.data.accessToken);
            }

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

        registerEmployer: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<{
              user: User;
              accessToken?: string;
              verification?: { otpCode: string; expiresIn: number };
            }>('/auth/employer/register', data);

            const user = response.data?.user || (response.data as unknown as User);

            if (typeof window !== 'undefined' && response.data?.accessToken) {
              localStorage.setItem('accessToken', response.data.accessToken);
            }

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return response.data;
          } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw error;
          }
        },

        verifyOtp: async (data) => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<{
              verified: boolean;
              user: User;
            }>('/auth/verify-otp', data);

            const user = response.data?.user || (response.data as unknown as User);

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });

            return response.data;
          } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Verification failed';
            set({
              isLoading: false,
              error: errorMessage,
            });
            throw error;
          }
        },

        resendOtp: async (email: string) => {
          set({ isLoading: true, error: null });
          try {
            const response = await apiClient.post<{
              verification: { otpCode: string; expiresIn: number };
            }>('/auth/resend-otp', { email });

            set({ isLoading: false, error: null });
            return response.data;
          } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Resending verification code failed';
            set({
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
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
            }
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
              window.location.href = '/';
            }
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
