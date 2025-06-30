"use client";

import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import UserLinks from "./UserLinks";


// Dynamic import of NavIcons to avoid SSR issues
const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

const Navbar = () => {
    return (
        <header className="w-full h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-background border-b border-border flex items-center justify-between">
            {/* MOBILE NAVBAR */}
            <div className="flex items-center justify-between w-full md:hidden">
                <Link href="/">
                    <span className="text-2xl tracking-wide text-primary font-semibold">
                        Capital Spirits
                    </span>
                </Link>
                <Menu />
            </div>

            {/* DESKTOP NAVBAR */}
            <div className="hidden md:flex items-center justify-between w-full">
                {/* LEFT SECTION: Logo + Nav Links */}
                <div className="flex items-center gap-12">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Capital Spirits Logo" width={32} height={32} />
                        <span className="text-2xl tracking-wide text-primary font-semibold">
                            Capital Spirits
                        </span>
                    </Link>
                    <nav className="hidden xl:flex gap-6">
                        <Link href="/" className="text-text hover:text-icon transition">Home</Link>
                        <Link href="/shop" className="text-text hover:text-icon transition">Shop</Link>
                        <Link href="/deals" className="text-text hover:text-icon transition">Deals</Link>
                        <Link href="/about" className="text-text hover:text-icon transition">About</Link>
                        <Link href="/contact" className="text-text hover:text-icon transition">Contact</Link>
                    </nav>
                </div>

                {/* RIGHT SECTION: Search + Nav Icons */}
                <div className="flex items-center gap-6">
                    <SearchBar />
                    <UserLinks />
                    <NavIcons />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
