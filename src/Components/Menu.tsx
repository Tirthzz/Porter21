"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await fetch("/api/menu");
            const data = await res.json();
            const orderedCategories = ["Wine", "Spirits", "Beer & Hard Seltzer", "Non-Alcoholic"];
            const filtered = orderedCategories
                .map(name => data.find((cat: VarietalMenu) => cat.name === name))
                .filter(Boolean) as VarietalMenu[];
            setMenuData(filtered);
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        setOpenCategory(null);
        setIsHovering(false);
    }, [pathname]);

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

    const buildPath = (categorySlug: string, subcatSlug?: string, varietalSlug?: string) => {
        let path = `/products/${categorySlug}`;
        if (subcatSlug) path += `/${subcatSlug}`;
        if (varietalSlug) {
            const params = new URLSearchParams();
            params.set("varietal", varietalSlug);
            params.set("page", "1");
            path += `?${params.toString()}`;
        }
        return path;
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
                            className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors ${openCategory === category.name ? "text-pink-600" : "text-gray-800"}`}
                        >
                            {category.name} <ChevronDown size={14} />
                        </button>

                        {openCategory === category.name && (
                            <div
                                className={`absolute left-1/2 -translate-x-1/2 mt-2 bg-white border rounded shadow-lg p-8 z-50 ${category.name === "Spirits" ? "w-[900px] grid grid-cols-3 gap-8" : "w-[700px] grid grid-cols-3 gap-6"}`}
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
                                        {['Whiskey', 'Tequila'].map((spirit) => {
                                            const subcat = category.subcategories.find((sc) => sc.name === spirit);
                                            return (
                                                <div key={spirit} className="space-y-2 text-left min-w-[150px]">
                                                    <Link
                                                        href={subcat ? buildPath(category.slug, subcat.slug) : "#"}
                                                        className="font-semibold text-gray-900 hover:text-pink-600 text-sm"
                                                    >
                                                        {spirit}
                                                    </Link>
                                                    {subcat?.varietals && (
                                                        <ul className="space-y-1 ml-2">
                                                            {subcat.varietals.map((varietal, idx) => (
                                                                <li key={idx}>
                                                                    <Link
                                                                        href={buildPath(category.slug, subcat.slug, varietal)}
                                                                        className="text-gray-600 hover:text-pink-600 text-xs block hover:bg-gray-50 rounded px-1 py-0.5"
                                                                    >
                                                                        {varietal}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            );
                                        })}
                                        <div className="space-y-2 text-left min-w-[150px]">
                                            {['Vodka', 'Gin', 'Rum', 'Brandy', 'Liqueur'].map((spirit) => {
                                                const subcat = category.subcategories.find((sc) => sc.name === spirit);
                                                return (
                                                    <Link
                                                        key={spirit}
                                                        href={subcat ? buildPath(category.slug, subcat.slug) : "#"}
                                                        className="block font-semibold text-gray-900 hover:text-pink-600 text-sm"
                                                    >
                                                        {spirit}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    category.subcategories.map((subcat) => (
                                        <div key={subcat.id} className="space-y-2 text-left min-w-[150px]">
                                            <Link
                                                href={buildPath(category.slug, subcat.slug)}
                                                className="font-semibold text-gray-900 hover:text-pink-600 text-sm"
                                            >
                                                {subcat.name}
                                            </Link>
                                            {subcat.varietals && (
                                                <ul className="space-y-1 ml-2">
                                                    {subcat.varietals.map((varietal, idx) => (
                                                        <li key={idx}>
                                                            <Link
                                                                href={buildPath(category.slug, subcat.slug, varietal)}
                                                                className="text-gray-600 hover:text-pink-600 text-xs block hover:bg-gray-50 rounded px-1 py-0.5"
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
                                <div className="col-span-full border-t pt-4 flex justify-center">
                                    <Link
                                        href={`/products/${category.slug}`}
                                        className="flex items-center gap-1 text-sm text-pink-600 hover:underline px-4 py-2"
                                    >
                                        {category.name === "Wine" && <Wine size={16} />}
                                        {category.name === "Spirits" && <Martini size={16} />}
                                        {category.name === "Beer & Hard Seltzer" && <Beer size={16} />}
                                        {category.name === "Non-Alcoholic" && <Coffee size={16} />}
                                        Browse All {category.name}
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
