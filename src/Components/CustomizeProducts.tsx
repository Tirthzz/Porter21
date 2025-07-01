"use client";

import React, { useState } from "react";

const PRICE_PER_BOTTLE = 15;

const PACK_OPTIONS = [
    { label: "3 Pack", value: 3, disabled: true },
    { label: "6 Pack", value: 6 },
    { label: "9 Pack", value: 9 },
    { label: "12 Pack", value: 12 },
];

const getTotalPrice = (packSize: number) => {
    return packSize * PRICE_PER_BOTTLE;
};

const CustomizeProducts = () => {
    const [selectedPack, setSelectedPack] = useState(9);

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
                    const totalPrice = getTotalPrice(pack.value);
                    const isSelected = selectedPack === pack.value;
                    return (
                        <div
                            key={pack.value}
                            onClick={() => handleSelect(pack.value, pack.disabled)}
                            className={`
                                flex flex-col items-center justify-center
                                border rounded-md p-2 cursor-pointer
                                transition
                                ${pack.disabled
                                    ? "bg-pink-100 text-pink-400 cursor-not-allowed"
                                    : isSelected
                                        ? "border-lama bg-lama text-white"
                                        : "border-gray-300 hover:border-lama"
                                }
                            `}
                        >
                            <span className="font-medium">{pack.label}</span>
                            <span className={`text-sm ${isSelected ? "text-white" : "text-gray-600"}`}>
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Total Price Confirmation Below */}
            {/*<div className="mt-4 p-4 border rounded-lg bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">*/}
            {/*    <span className="text-lg font-semibold">Total Price:</span>*/}
            {/*    <span className="text-2xl font-bold text-green-700">*/}
            {/*        ${getTotalPrice(selectedPack).toFixed(2)}*/}
            {/*    </span>*/}
            {/*    <span className="text-sm text-gray-500">(at ${PRICE_PER_BOTTLE.toFixed(2)} per bottle)</span>*/}
            {/*</div>*/}
        </div>
    );
};

export default CustomizeProducts;
