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
  isLoading: boolean;
  error: string | null;
  filters: JobFilters;

  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  setFilter: (key: keyof JobFilters, value: any) => void;
  fetchJobs: (overrideParams?: Record<string, any>) => Promise<void>;
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  selectedJob: null,
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
}));
