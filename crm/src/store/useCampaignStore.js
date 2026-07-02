import { create } from 'zustand';
import { getCampaigns, createCampaign, sendCampaign, getCampaignStats } from '@/services/campaignService';

export const useCampaignStore = create((set, get) => ({
    campaigns: [],
    loading: true,
    error: '',

    fetchCampaigns: async () => {
        set({ loading: true, error: '' });
        try {
            const data = await getCampaigns();
            if (data.success) {
                set({ campaigns: data.data, loading: false });
            } else {
                set({ loading: false, error: 'Failed to load campaigns' });
            }
        } catch (error) {
            console.error("Failed to fetch campaigns", error);
            set({ loading: false, error: 'Failed to fetch campaigns' });
        }
    },

    createNewCampaign: async (payload) => {
        try {
            const data = await createCampaign(payload);
            if (data.success) {
                await get().fetchCampaigns();
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            console.error("Failed to create campaign", error);
            return { success: false, message: 'Failed to create campaign' };
        }
    },

    dispatchCampaign: async (id) => {
        try {
            const data = await sendCampaign(id);
            await get().fetchCampaigns();
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Failed to dispatch campaign", error);
            return { success: false, message: error.response?.data?.message || "Failed to dispatch campaign" };
        }
    },

    checkCampaignStatus: async (id) => {
        try {
            const data = await getCampaignStats(id);
            if (data.success) {
                return { success: true, stats: data.data.stats };
            }
            return { success: false };
        } catch (error) {
            console.error("Failed to check status", error);
            return { success: false, message: "Failed to fetch stats" };
        }
    }
}));
