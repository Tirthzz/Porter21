"use client";

import React from "react";

interface CustomizeProductsProps {
    pricing: {
        price_3pk: number | null;
        price_6pk: number | null;
        price_9pk: number | null;
        price_12pk: number | null;
    };
    selectedPack: number; // <-- Add this
    setSelectedPack: React.Dispatch<React.SetStateAction<number>>; // <-- Add this
}

const CustomizeProducts: React.FC<CustomizeProductsProps> = ({ pricing, selectedPack, setSelectedPack }) => {
    const PACK_OPTIONS = [
        { label: "3 Pack", value: 3, price: pricing.price_3pk },
        { label: "6 Pack", value: 6, price: pricing.price_6pk },
        { label: "9 Pack", value: 9, price: pricing.price_9pk },
        { label: "12 Pack", value: 12, price: pricing.price_12pk },
    ];

    const handleSelect = (packValue: number, disabled?: boolean) => {
        if (!disabled) {
            setSelectedPack(packValue);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-medium">Select a Pack</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PACK_OPTIONS.map((pack) => {
                    const isSelected = selectedPack === pack.value;
                    const disabled = pack.price === null || pack.price === undefined;
                    return (
                        <div
                            key={pack.value}
                            onClick={() => handleSelect(pack.value, disabled)}
                            className={`
                                flex flex-col items-center justify-center
                                border rounded-md p-2 cursor-pointer transition
                                ${disabled
                                    ? "bg-pink-100 text-pink-400 cursor-not-allowed"
                                    : isSelected
                                        ? "border-lama bg-lama text-white"
                                        : "border-gray-300 hover:border-lama"
                                }
                            `}
                        >
                            <span className="font-medium">{pack.label}</span>
                            <span className={`text-sm ${isSelected ? "text-white" : "text-gray-600"}`}>
                                {pack.price !== null && pack.price !== undefined
                                    ? `$${pack.price.toFixed(2)}`
                                    : "N/A"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomizeProducts;
