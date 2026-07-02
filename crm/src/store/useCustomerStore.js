import { create } from 'zustand';
import { getCustomers, getCustomersPreview, getCustomerDetails } from '@/services/customerService';

export const useCustomerStore = create((set, get) => ({
    customers: [],
    loading: true,
    page: 1,
    totalPages: 1,
    selectedCustomer: null,
    previewCount: null,
    filters: {
        search: '',
        inactiveDays: '',
        minSpend: '',
        maxSpend: '',
        minOrders: '',
        tier: '',
        city: '',
        segment: ''
    },

    setPage: (newPage) => set({ page: newPage }),
    
    setFilters: (newFilters) => set({ filters: newFilters, page: 1 }),
    
    clearFilters: () => set({ 
        filters: { search: '', inactiveDays: '', minSpend: '', maxSpend: '', minOrders: '', tier: '', city: '', segment: '' },
        page: 1 
    }),

    buildQueryString: () => {
        const { page, filters } = get();
        const params = new URLSearchParams();
        params.append('page', page);
        Object.keys(filters).forEach(key => {
            if (filters[key]) params.append(key, filters[key]);
        });
        return params.toString();
    },

    fetchCustomers: async () => {
        set({ loading: true });
        try {
            const data = await getCustomers(get().buildQueryString());
            if (data.success) {
                set({ customers: data.data, totalPages: data.pagination.totalPages });
            }
        } catch (error) {
            console.error("Failed to fetch customers", error);
        } finally {
            set({ loading: false });
        }
    },

    fetchPreviewCount: async () => {
        try {
            const qs = get().buildQueryString().replace(/page=\d+&?/, '');
            const data = await getCustomersPreview(qs);
            if (data.success) {
                set({ previewCount: data.count });
            }
        } catch (error) {
            console.error("Failed to fetch preview count", error);
        }
    },

    fetchCustomerDetails: async (customerId) => {
        try {
            const data = await getCustomerDetails(customerId);
            if (data.success) {
                set({ selectedCustomer: data.data });
            }
        } catch (error) {
            console.error("Failed to fetch customer details", error);
        }
    },
    
    clearSelectedCustomer: () => set({ selectedCustomer: null })
}));
