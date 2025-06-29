"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal";

const NavIcons = () => {
    // State to handle profile dropdown visibility
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // State to handle cart modal visibility
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Simulate logged-in state (to be replaced with auth integration later)
    const isLoggedIn = false;

    const router = useRouter();

    // Handle profile icon click
    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        }
        setIsProfileOpen((prev) => !prev);
    };

    return (
        <div className="flex items-center gap-4 xl:gap-6 relative">
            {/* Profile Icon */}
            <Image
                src="/profile.png"
                alt="Profile Icon"
                width={22}
                height={22}
                className="cursor-pointer"
                onClick={handleProfile}
            />

            {/* Profile Dropdown */}
            {isProfileOpen && (
                <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 bg-background border border-border flex flex-col gap-2">
                    <Link href="/" className="hover:text-icon transition">
                        Profile
                    </Link>
                    <div className="cursor-pointer hover:text-icon transition">Logout</div>
                </div>
            )}

            {/* Notification Icon */}
            <Image
                src="/notification.png"
                alt="Notification Icon"
                width={22}
                height={22}
                className="cursor-pointer"
            />

            {/* Cart Icon with badge */}
            <div className="relative cursor-pointer">
                <Image
                    src="/cart.png"
                    alt="Cart Icon"
                    width={22}
                    height={22}
                    className="cursor-pointer"
                    onClick={() => setIsCartOpen((prev) => !prev)}
                />
                {/* Cart item count badge */}
                <div className="absolute -top-3 -right-3 w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center">
                    2
                </div>
            </div>

            {/* Cart Modal */}
            {isCartOpen && <CartModal />}
        </div>
    );
};

export default NavIcons;
