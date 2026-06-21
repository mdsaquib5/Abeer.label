import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            // Add item or increase qty if same product+size exists
            addItem: (product, size, quantity = 1) => {
                const existing = get().items.find(
                    i => i.id === product.id && i.size === size
                );
                if (existing) {
                    set(state => ({
                        items: state.items.map(i =>
                            i.id === product.id && i.size === size
                                ? { ...i, quantity: i.quantity + quantity }
                                : i
                        )
                    }));
                } else {
                    set(state => ({
                        items: [
                            ...state.items,
                            {
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.images?.[0] || product.image || '',
                                collection: product.collection || '',
                                size,
                                quantity,
                            }
                        ]
                    }));
                }
            },

            // Remove item by id + size
            removeItem: (id, size) => {
                set(state => ({
                    items: state.items.filter(i => !(i.id === id && i.size === size))
                }));
            },

            // Update quantity
            updateQuantity: (id, size, quantity) => {
                if (quantity < 1) return;
                set(state => ({
                    items: state.items.map(i =>
                        i.id === id && i.size === size ? { ...i, quantity } : i
                    )
                }));
            },

            // Clear cart
            clearCart: () => set({ items: [] }),

            // Derived values
            totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
            subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
        }),
        {
            name: 'abeer-cart', // persisted in localStorage
        }
    )
);

export default useCartStore;
