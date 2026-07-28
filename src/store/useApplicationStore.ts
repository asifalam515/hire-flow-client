import { create } from 'zustand';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';

interface ApplicationState {
  isApplying: boolean;
  applyError: string | null;
  applyForJob: (jobId: string) => Promise<boolean>;
}

export const useApplicationStore = create<ApplicationState>((set) => ({
  isApplying: false,
  applyError: null,

  applyForJob: async (jobId: string) => {
    set({ isApplying: true, applyError: null });
    try {
      await apiClient.post('/applications', { jobId });
      set({ isApplying: false });
      toast.success('Successfully applied to the job!');
      return true;
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply for job';
      
      // If error contains specific API error message, it is usually embedded by apiClient or Axios
      const detailedMessage = err?.response?.data?.message || err?.response?.data?.error?.message || errorMessage;
      
      set({
        applyError: detailedMessage,
        isApplying: false,
      });
      
      toast.error(detailedMessage);
      return false;
    }
  },
}));
