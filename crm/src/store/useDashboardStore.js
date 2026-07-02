import { create } from 'zustand';
import { getDashboardStats, recomputeEngine } from '@/services/dashboardService';

export const useDashboardStore = create((set, get) => ({
    stats: null,
    loading: true,
    recomputing: false,
    error: '',

    fetchStats: async () => {
        // Optional caching: if stats already exist, don't refetch or fetch silently
        // if (get().stats) return; 

        set({ loading: true, error: '' });
        try {
            const data = await getDashboardStats();
            if (data.success) {
                set({ stats: data.data, loading: false });
            } else {
                set({ loading: false, error: 'Failed to load statistics' });
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
            set({ loading: false, error: 'Failed to load statistics' });
        }
    },

    triggerRecompute: async () => {
        set({ recomputing: true });
        try {
            await recomputeEngine();
            return { success: true, message: 'Analytics engine started in the background.' };
        } catch (error) {
            return { success: false, message: 'Failed to trigger engine.' };
        } finally {
            set({ recomputing: false });
        }
    }
}));
