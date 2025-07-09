"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = () => {
    const [filters, setFilters] = useState<any>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [isPending, startTransition] = useTransition();

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    //  Extract cat and subcat from pathname
    const parts = pathname.split("/").filter(Boolean);
    const cat = parts[1] || "";     // products/<cat>/<subcat>
    const subcat = parts[2] || "";

    useEffect(() => {
        const fetchFilters = async () => {
            const res = await fetch(`/api/filters?cat=${cat}&subcat=${subcat}`);
            const data = await res.json();
            setFilters(data);
            setPriceRange([data.minPrice || 0, data.maxPrice || 100]);
        };
        fetchFilters();
    }, [pathname]); // rerun when navigating to different category

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    if (!filters) return <div>Loading filters...</div>;

    return (
        <div className="space-y-4 w-full md:w-64">
            <h2 className="font-semibold text-lg">Filters</h2>

            <Select
                options={filters.varietals.map((v: string) => ({ label: v, value: v }))}
                onChange={(val: any) => updateParams("varietal", val?.value)}
                placeholder="Search Varietals"
                isClearable
            />

            <Select
                options={filters.regions.map((r: string) => ({ label: r, value: r }))}
                onChange={(val: any) => updateParams("region", val?.value)}
                placeholder="Search Regions"
                isClearable
            />

            <Select
                options={filters.countries.map((c: string) => ({ label: c, value: c }))}
                onChange={(val: any) => updateParams("country", val?.value)}
                placeholder="Search Countries"
                isClearable
            />

            <div>
                <p>Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
                <Slider
                    range
                    min={filters.minPrice}
                    max={filters.maxPrice}
                    defaultValue={[filters.minPrice, filters.maxPrice]}
                    onAfterChange={(val: any) => {
                        updateParams("min", val[0].toString());
                        updateParams("max", val[1].toString());
                    }}
                />
            </div>
        </div>
    );
};

export default Filter;
