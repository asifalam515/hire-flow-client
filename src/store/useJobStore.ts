import { create } from 'zustand';
import { Job } from '@/types';
import { apiClient } from '@/lib/api';

export interface JobFilters {
  search?: string;
  location?: string;
  languages?: string; // Comma separated
  educationLevel?: string;
  employmentTypes?: string; // Comma separated
  nature?: string; // Comma separated
  minSalary?: number;
  maxSalary?: number;
}

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  similarJobs: Job[];
  matchScore: number | null;
  matchMissingProfile: boolean;
  savedJobIds: string[];
  isLoading: boolean;
  error: string | null;
  filters: JobFilters;

  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilter: (key: keyof JobFilters, value: any) => void;
  fetchJobs: (overrideParams?: Record<string, any>) => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  fetchSimilarJobs: (category: string, excludeId: string) => Promise<void>;
  fetchJobMatch: (jobId: string) => Promise<void>;
  fetchSavedJobs: () => Promise<void>;
  toggleSaveJob: (jobId: string) => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  selectedJob: null,
  similarJobs: [],
  matchScore: null,
  matchMissingProfile: false,
  savedJobIds: [],
  isLoading: false,
  error: null,
  filters: {},

  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),

  setFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
    get().fetchJobs();
  },

  fetchJobs: async (overrideParams = {}) => {
    set({ isLoading: true, error: null });
    try {
      const activeFilters = { ...get().filters, ...overrideParams };
      // Remove empty strings or undefined to clean up URL
      const params = Object.fromEntries(
        Object.entries(activeFilters).filter(([_, v]) => v !== undefined && v !== '')
      );

      const response = await apiClient.get<any>('/jobs', { params });
      set({ jobs: response.data?.jobs || [], isLoading: false });
    } catch (err: any) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch jobs',
        isLoading: false,
      });
    }
  },

  fetchJobById: async (id: string) => {
    set({ isLoading: true, error: null, selectedJob: null });
    try {
      const response = await apiClient.get<any>(`/jobs/${id}`);
      set({ selectedJob: response.data?.job || null, isLoading: false });
    } catch (err: any) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch job details',
        isLoading: false,
      });
    }
  },

  fetchSimilarJobs: async (category: string, excludeId: string) => {
    try {
      const response = await apiClient.get<any>('/jobs', {
        params: { category, excludeId, limit: 4 },
      });
      set({ similarJobs: response.data?.jobs || [] });
    } catch (err: any) {
      console.error('Failed to fetch similar jobs:', err);
      // We don't necessarily want to blow up the whole page UI for similar jobs failing
    }
  },

  fetchJobMatch: async (jobId: string) => {
    set({ matchScore: null, matchMissingProfile: false });
    try {
      const response = await apiClient.get<any>(`/jobs/${jobId}/match`);
      const { matchScore, profileMissing } = response.data;
      set({ matchScore, matchMissingProfile: profileMissing });
    } catch (err: any) {
      // 401 means not logged in, we ignore and leave matchScore null
      console.error('Failed to fetch job match:', err);
    }
  },

  fetchSavedJobs: async () => {
    try {
      const response = await apiClient.get<any>('/jobs/saved/me');
      const savedJobs = response.data?.savedJobs || [];
      const savedJobIds = savedJobs.map((item: any) => item.jobId);
      set({ savedJobIds });
    } catch (err: any) {
      console.error('Failed to fetch saved jobs:', err);
    }
  },

  toggleSaveJob: async (jobId: string) => {
    const { savedJobIds } = get();
    const isSaved = savedJobIds.includes(jobId);
    
    // Optimistic update
    const newSavedJobIds = isSaved
      ? savedJobIds.filter((id) => id !== jobId)
      : [...savedJobIds, jobId];
      
    set({ savedJobIds: newSavedJobIds });

    try {
      await apiClient.post(`/jobs/${jobId}/save`);
    } catch (err) {
      // Revert on failure
      set({ savedJobIds });
      console.error('Failed to toggle save job:', err);
    }
  },
}));
