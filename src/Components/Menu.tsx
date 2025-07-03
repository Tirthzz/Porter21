"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Wine, Beer, Martini, Coffee } from "lucide-react";

type VarietalMenu = {
    id: number;
    name: string;
    slug: string;
    subcategories: {
        id: number;
        name: string;
        slug: string;
        varietals?: string[];
    }[];
};

export default function Menu() {
    const [menuData, setMenuData] = useState<VarietalMenu[]>([]);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await fetch("/api/menu");
            const data = await res.json();

            const orderedCategories = ["Beer & Hard Seltzer", "Wine", "Spirits", "Non-Alcoholic"];
            const filtered = orderedCategories
                .map((name) => data.find((cat: VarietalMenu) => cat.name === name))
                .filter(Boolean) as VarietalMenu[];

            setMenuData(filtered);
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenCategory(null);
                setIsHovering(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const icons: Record<string, JSX.Element> = {
        "Beer & Hard Seltzer": <Beer size={16} />,
        Wine: <Wine size={16} />,
        Spirits: <Martini size={16} />,
        "Non-Alcoholic": <Coffee size={16} />,
    };

    return (
        <div ref={menuRef} className="w-full bg-white shadow-sm border-b flex justify-center">
            <nav className="flex space-x-8 py-2">
                {menuData.map((category) => (
                    <div
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => {
                            setOpenCategory(category.name);
                            setIsHovering(true);
                        }}
                        onMouseLeave={() => {
                            setIsHovering(false);
                            setTimeout(() => {
                                if (!isHovering) {
                                    setOpenCategory(null);
                                }
                            }, 150);
                        }}
                    >
                        <button
                            className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors ${openCategory === category.name ? "text-pink-600" : "text-gray-800"
                                }`}
                        >
                            {category.name} <ChevronDown size={14} />
                        </button>

                        {openCategory === category.name && (
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow-lg p-8 z-50 ${category.name === "Spirits" ? "w-[900px] grid grid-cols-3 gap-x-8 gap-y-4" : "w-[600px] grid grid-cols-2 gap-6"
                                    }`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => {
                                    setIsHovering(false);
                                    setTimeout(() => {
                                        if (!isHovering) {
                                            setOpenCategory(null);
                                        }
                                    }, 150);
                                }}
                            >
                                {category.name === "Spirits" ? (
                                    <>
                                        {/* Column 1: Whiskey */}
                                        <div className="space-y-2">
                                            {category.subcategories
                                                .filter((subcat) => subcat.name === "Whiskey")
                                                .map((subcat) => (
                                                    <div key={subcat.id}>
                                                        <Link href={`/subcategory/${subcat.slug}`} className="font-semibold text-gray-900 hover:text-pink-600 text-sm">
                                                            {subcat.name}
                                                        </Link>
                                                        {subcat.varietals && (
                                                            <ul className="space-y-1 mt-1">
                                                                {subcat.varietals.map((varietal, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={`/search?q=${encodeURIComponent(varietal)}`}
                                                                            className="text-gray-600 hover:text-pink-600 text-xs"
                                                                        >
                                                                            {varietal}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>

                                        {/* Column 2: Tequila */}
                                        <div className="space-y-2">
                                            {category.subcategories
                                                .filter((subcat) => subcat.name === "Tequila")
                                                .map((subcat) => (
                                                    <div key={subcat.id}>
                                                        <Link href={`/subcategory/${subcat.slug}`} className="font-semibold text-gray-900 hover:text-pink-600 text-sm">
                                                            {subcat.name}
                                                        </Link>
                                                        {subcat.varietals && (
                                                            <ul className="space-y-1 mt-1">
                                                                {subcat.varietals.map((varietal, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={`/search?q=${encodeURIComponent(varietal)}`}
                                                                            className="text-gray-600 hover:text-pink-600 text-xs"
                                                                        >
                                                                            {varietal}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>

                                        {/* Column 3: All other subcategories */}
                                        <div className="space-y-2">
                                            {category.subcategories
                                                .filter((subcat) => subcat.name !== "Whiskey" && subcat.name !== "Tequila")
                                                .map((subcat) => (
                                                    <div key={subcat.id}>
                                                        <Link href={`/subcategory/${subcat.slug}`} className="font-semibold text-gray-900 hover:text-pink-600 text-sm">
                                                            {subcat.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                ) : (
                                    category.subcategories.map((subcat) => (
                                        <div key={subcat.id} className="space-y-1">
                                            <Link href={`/subcategory/${subcat.slug}`} className="font-semibold text-gray-900 hover:text-pink-600 text-sm">
                                                {subcat.name}
                                            </Link>
                                            {subcat.varietals && (
                                                <ul className="space-y-1 ml-2">
                                                    {subcat.varietals.map((varietal, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                href={`/search?q=${encodeURIComponent(varietal)}`}
                                                                className="text-gray-600 hover:text-pink-600 text-xs"
                                                            >
                                                                {varietal}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))
                                )}

                                <div className={`${category.name === "Spirits" ? "col-span-3" : "col-span-2"} border-t pt-4 flex justify-center`}>
                                    <Link
                                        href={`/category/${category.slug}`}
                                        className="flex items-center gap-1 text-sm text-pink-600 hover:underline"
                                    >
                                        {icons[category.name]} Browse All {category.name}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </div>
    );
}
