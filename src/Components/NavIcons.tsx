"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CartModal from "./CartModal";

const NavIcons = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="relative hover:bg-gray-100 p-2 rounded-md transition">
                <ShoppingCart size={24} className="text-gray-700" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
            </button>
            {isOpen && <CartModal onClose={() => setIsOpen(false)} />}
        </div>
    );
};

export default NavIcons;