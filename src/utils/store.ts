import { create } from "zustand";

export interface CartItem {
    id: string;
    name: string;
    image: string;
    packSize: number;
    price: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, packSize: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],

    addToCart: (item) =>
        set((state) => {
            const existingIndex = state.cart.findIndex(
                (cartItem) =>
                    cartItem.id === item.id && cartItem.packSize === item.packSize
            );

            if (existingIndex !== -1) {
                const updatedCart = [...state.cart];
                updatedCart[existingIndex].quantity += item.quantity;
                return { cart: updatedCart };
            }

            return { cart: [...state.cart, item] };
        }),

    removeFromCart: (id, packSize) =>
        set((state) => ({
            cart: state.cart.filter(
                (item) => !(item.id === id && item.packSize === packSize)
            ),
        })),

    clearCart: () => set({ cart: [] }),
}));
