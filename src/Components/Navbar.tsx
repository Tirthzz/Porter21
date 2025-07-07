"use client";

import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, MapPin, Truck, Store } from "lucide-react";
import NavIcons from "./NavIcons";

const Navbar = () => {
    const { data: session } = useSession();
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [mode, setMode] = useState("Delivery");
    const [store, setStore] = useState("Capital Spirits Hartford");

    const locationRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsLocationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleLocation = () => setIsLocationOpen(!isLocationOpen);
    const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

    return (
        <header className="w-full h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Capital Spirits Logo" width={36} height={36} />
                <span className="text-xl md:text-2xl font-semibold text-gray-800">Capital Spirits</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <SearchBar />
            </div>

            <div className="flex items-center gap-4 relative">
                <div ref={locationRef}>
                    <button onClick={toggleLocation} className="flex items-center gap-1 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition">
                        <MapPin size={20} />
                        <span className="hidden md:inline text-sm">{mode === "Delivery" ? "Delivery" : store}</span>
                        <ChevronDown size={18} />
                    </button>

                    {isLocationOpen && (
                        <div className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4 space-y-3">
                            <h3 className="font-medium text-gray-800 text-sm">Select Mode</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setMode("Delivery")} className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md border ${mode === "Delivery" ? "bg-gray-200 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                                    <Truck size={16} /> Delivery
                                </button>
                                <button onClick={() => setMode("Pickup")} className={`flex items-center gap-1 text-sm px-2 py-1 rounded-md border ${mode === "Pickup" ? "bg-gray-200 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                                    <Store size={16} /> Pickup
                                </button>
                            </div>
                            {mode === "Pickup" && (
                                <div className="space-y-2 mt-2">
                                    <button onClick={() => setStore("Capital Spirits Hartford")} className={`block text-left w-full p-2 rounded-md border ${store === "Capital Spirits Hartford" ? "bg-gray-100 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                                        <p className="text-sm font-medium">Capital Spirits Hartford</p>
                                        <p className="text-xs text-gray-500">73-77 Pratt St, Hartford, CT 06103</p>
                                    </button>
                                    <button onClick={() => setStore("Capital Spirits Monroe")} className={`block text-left w-full p-2 rounded-md border ${store === "Capital Spirits Monroe" ? "bg-gray-100 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                                        <p className="text-sm font-medium">Capital Spirits Monroe</p>
                                        <p className="text-xs text-gray-500">Main St, Monroe, CT 06468</p>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {session ? (
                    <div className="relative flex items-center gap-3" ref={profileRef}>
                        <button onClick={toggleProfile} className="flex items-center gap-2 hover:bg-gray-100 px-2 py-2 rounded-full transition">
                            <Image src={session.user.image || "/default-profile.png"} alt="profile" width={32} height={32} className="rounded-full object-cover" />
                            <ChevronDown size={18} />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-2">
                                <Link href="/my-wines" className="block px-4 py-2 text-sm hover:bg-gray-100">My Wines</Link>
                                <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">Orders</Link>
                                <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                                <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</Link>
                                <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Log out</button>
                            </div>
                        )}

                        <NavIcons />
                    </div>
                ) : (
                    <Link href="/login" className="text-sm font-medium text-gray-700 hover:underline">Login</Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;
