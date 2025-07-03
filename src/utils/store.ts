import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartType, CartItemType } from "@/types/types";

type CartStore = {
    cart: CartType;
    isCartOpen: boolean;
    addToCart: (item: CartItemType) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: {
                products: [],
                totalItems: 0,
                totalPrice: 0,
            },
            isCartOpen: false,

            addToCart: (item) => {
                const state = get();
                const existingItem = state.cart.products.find(
                    (p) => p.id === item.id && p.optionTitle === item.optionTitle
                );

                let updatedProducts;
                if (existingItem) {
                    updatedProducts = state.cart.products.map((p) =>
                        p.id === item.id && p.optionTitle === item.optionTitle
                            ? { ...p, quantity: p.quantity + item.quantity }
                            : p
                    );
                } else {
                    updatedProducts = [...state.cart.products, item];
                }

                const totalItems = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
                const totalPrice = updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

                set({
                    cart: { products: updatedProducts, totalItems, totalPrice },
                    isCartOpen: true,
                });
            },

            removeFromCart: (id) => {
                const state = get();
                const updatedProducts = state.cart.products.filter((p) => p.id !== id);
                const totalItems = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
                const totalPrice = updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
                set({ cart: { products: updatedProducts, totalItems, totalPrice } });
            },

            updateQuantity: (id, quantity) => {
                const state = get();
                const updatedProducts = state.cart.products.map((p) =>
                    p.id === id ? { ...p, quantity } : p
                );
                const totalItems = updatedProducts.reduce((sum, p) => sum + p.quantity, 0);
                const totalPrice = updatedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);
                set({ cart: { products: updatedProducts, totalItems, totalPrice } });
            },

            clearCart: () => set({
                cart: { products: [], totalItems: 0, totalPrice: 0 },
            }),

            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
