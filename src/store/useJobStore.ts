import { create } from 'zustand';
import { Job } from '@/types';
import { apiClient } from '@/lib/api';

interface JobState {
  jobs: Job[];
  selectedJob: Job | null;
  isLoading: boolean;
  error: string | null;

  setJobs: (jobs: Job[]) => void;
  setSelectedJob: (job: Job | null) => void;
  fetchJobs: (params?: Record<string, any>) => Promise<void>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  selectedJob: null,
  isLoading: false,
  error: null,

  setJobs: (jobs) => set({ jobs }),
  setSelectedJob: (selectedJob) => set({ selectedJob }),

  fetchJobs: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<Job[]>('/jobs', { params });
      set({ jobs: response.data || [], isLoading: false });
    } catch (err: any) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch jobs',
        isLoading: false,
      });
    }
  },
}));
