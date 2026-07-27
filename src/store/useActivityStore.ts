import { create } from 'zustand';
import { Application, SavedJob, FollowedCompany } from '@/types';
import { apiClient } from '@/lib/api';

interface ActivityState {
  applications: Application[];
  offeredJobs: Application[];
  savedJobs: SavedJob[];
  followedCompanies: FollowedCompany[];
  isLoading: boolean;
  error: string | null;

  fetchApplications: (status?: string) => Promise<void>;
  fetchOfferedJobs: () => Promise<void>;
  fetchSavedJobs: () => Promise<void>;
  fetchFollowedCompanies: () => Promise<void>;
  unfollowCompany: (companyId: string) => Promise<void>;
  updatePreferences: (data: any) => Promise<void>;
}

export const useActivityStore = create<ActivityState>((set, get) => ({
  applications: [],
  offeredJobs: [],
  savedJobs: [],
  followedCompanies: [],
  isLoading: false,
  error: null,

  fetchApplications: async (status) => {
    set({ isLoading: true, error: null });
    try {
      const params = status && status !== 'All' ? { status: status.toUpperCase() } : {};
      const response = await apiClient.get<{ success: boolean; data: Application[] }>('/candidates/me/applications', { params });
      set({ applications: response.data?.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch applications', isLoading: false });
    }
  },

  fetchOfferedJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<{ success: boolean; data: Application[] }>('/candidates/me/applications', { params: { status: 'OFFER' } });
      set({ offeredJobs: response.data?.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch offered jobs', isLoading: false });
    }
  },

  fetchSavedJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<{ success: boolean; data: { savedJobs: SavedJob[] } }>('/jobs/saved/me');
      set({ savedJobs: response.data?.data?.savedJobs || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch saved jobs', isLoading: false });
    }
  },

  fetchFollowedCompanies: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<{ success: boolean; data: FollowedCompany[] }>('/candidates/me/followed-companies');
      set({ followedCompanies: response.data?.data || [], isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch followed companies', isLoading: false });
    }
  },

  unfollowCompany: async (companyId: string) => {
    try {
      await apiClient.delete(`/candidates/me/followed-companies/${companyId}`);
      set((state) => ({
        followedCompanies: state.followedCompanies.filter(fc => fc.companyId !== companyId)
      }));
    } catch (err: any) {
      console.error('Failed to unfollow company:', err);
    }
  },

  updatePreferences: async (data: any) => {
    try {
      await apiClient.patch('/candidates/me/preferences', data);
    } catch (err: any) {
      console.error('Failed to update preferences:', err);
      throw err;
    }
  }
}));
