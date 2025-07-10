"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Filter = () => {
    const [filters, setFilters] = useState<any>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [selectedVarietal, setSelectedVarietal] = useState<any>(null);
    const [selectedRegion, setSelectedRegion] = useState<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const parts = pathname.split("/").filter(Boolean);
    const cat = parts[1] || "";
    const subcat = parts[2] || "";

    useEffect(() => {
        const fetchFilters = async () => {
            const res = await fetch(`/api/filters?cat=${cat}&subcat=${subcat}`);
            const data = await res.json();
            setFilters(data);

            const minPriceParam = parseFloat(searchParams.get("min") || data.minPrice || "0");
            const maxPriceParam = parseFloat(searchParams.get("max") || data.maxPrice || "100");
            setPriceRange([minPriceParam, maxPriceParam]);

            const varietalParam = searchParams.get("varietal");
            const regionParam = searchParams.get("region");
            const countryParam = searchParams.get("country");

            if (varietalParam) {
                setSelectedVarietal({ label: varietalParam, value: varietalParam });
            }
            if (regionParam) {
                setSelectedRegion({ label: regionParam, value: regionParam });
            }
            if (countryParam) {
                setSelectedCountry({ label: countryParam, value: countryParam });
            }
        };
        fetchFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const updateMultipleParams = (updates: { [key: string]: string | null }) => {
        const params = new URLSearchParams(searchParams);
        for (const key in updates) {
            const value = updates[key];
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }
        params.set("page", "1"); // reset pagination
        router.push(`${pathname}?${params.toString()}`);
    };

    const updateParam = (key: string, value: string | null) => {
        updateMultipleParams({ [key]: value });
    };

    if (!filters) return <div>Loading filters...</div>;

    return (
        <div className="space-y-4 w-full md:w-64">
            <h2 className="font-semibold text-lg">Filters</h2>

            <Select
                options={filters.varietals.map((v: { name: string; count: number }) => ({
                    label: `${v.name} (${v.count})`,
                    value: v.name,
                }))}
                onChange={(val: any) => {
                    setSelectedVarietal(val);
                    updateParam("varietal", val?.value || null);
                }}
                placeholder="Search Varietals"
                isClearable
                value={selectedVarietal}
            />

            <Select
                options={filters.regions.map((r: { name: string; count: number }) => ({
                    label: `${r.name} (${r.count})`,
                    value: r.name,
                }))}
                onChange={(val: any) => {
                    setSelectedRegion(val);
                    updateParam("region", val?.value || null);
                }}
                placeholder="Search Regions"
                isClearable
                value={selectedRegion}
            />

            <Select
                options={filters.countries.map((c: { name: string; count: number }) => ({
                    label: `${c.name} (${c.count})`,
                    value: c.name,
                }))}
                onChange={(val: any) => {
                    setSelectedCountry(val);
                    updateParam("country", val?.value || null);
                }}
                placeholder="Search Countries"
                isClearable
                value={selectedCountry}
            />

            <div>
                <p>Price Range: ${priceRange[0]} - ${priceRange[1]}</p>
                <Slider
                    range
                    min={filters.minPrice}
                    max={filters.maxPrice}
                    value={priceRange}
                    onChange={(val) => {
                        if (Array.isArray(val)) {
                            setPriceRange(val as [number, number]);
                        }
                    }}
                    onAfterChange={(val) => {
                        if (Array.isArray(val)) {
                            updateMultipleParams({
                                min: val[0].toString(),
                                max: val[1].toString(),
                            });
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Filter;
