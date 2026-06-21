import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,

    setUser: (user, token) => set({ user, token, isAuthenticated: true }),
    clearUser: () => set({ user: null, token: null, isAuthenticated: false }),
}));

export default useAuthStore;
