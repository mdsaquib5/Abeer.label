import { create } from 'zustand';
import { loginAdmin } from '@/services/authService';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: '',

    login: async (email, password) => {
        set({ loading: true, error: '' });
        try {
            const data = await loginAdmin(email, password);
            if (data.success) {
                localStorage.setItem('crm_token', data.token);
                localStorage.setItem('crm_user', JSON.stringify(data.user));
                set({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
                return { success: true };
            }
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Login failed. Check your credentials.',
                loading: false
            });
            return { success: false };
        }
    },

    logout: () => {
        localStorage.removeItem('crm_token');
        localStorage.removeItem('crm_user');
        set({ user: null, token: null, isAuthenticated: false });
    },

    checkAuth: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('crm_token');
            const user = localStorage.getItem('crm_user');
            if (token && user) {
                set({ user: JSON.parse(user), token, isAuthenticated: true });
            }
        }
    }
}));
