"use client";

import { ShoppingCart } from "lucide-react";
import { useEffect, useRef } from "react";
import CartModal from "./CartModal";
import { useCartStore } from "@/utils/store";

const NavIcons = () => {
    const { isCartOpen, openCart, closeCart, cart } = useCartStore();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeCart();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [closeCart]);

    return (
        <div className="relative" ref={containerRef}>
            <button onClick={isCartOpen ? closeCart : openCart} className="relative hover:bg-gray-100 p-2 rounded-md transition">
                <ShoppingCart size={24} className="text-gray-700" />
                {cart.totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cart.totalItems}
                    </span>
                )}
            </button>
            {isCartOpen && <CartModal />}
        </div>
    );
};

export default NavIcons;
