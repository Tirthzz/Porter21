"use client";

import React, { useState } from "react";

interface AddProps {
    quantityAvailable: number; // <-- Add this
    selectedPack: number;      // <-- Add this
}

const Add: React.FC<AddProps> = ({ quantityAvailable, selectedPack }) => {
    const [quantity, setQuantity] = useState(1);

    const packsAvailable = Math.floor(quantityAvailable / selectedPack);

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < packsAvailable) {
            setQuantity((prev) => prev + 1);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-primary">Choose a Quantity</h4>
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="bg-footerbg py-2 px-4 rounded-3xl flex items-center justify-between w-32 border border-border">
                        <button
                            className="cursor-pointer text-xl text-primary hover:text-icon transition"
                            onClick={() => handleQuantity("d")}
                        >
                            -
                        </button>
                        <span className="text-text">{quantity}</span>
                        <button
                            className="cursor-pointer text-xl text-primary hover:text-icon transition"
                            onClick={() => handleQuantity("i")}
                        >
                            +
                        </button>
                    </div>
                    <div className={`text-xs ${packsAvailable < 50 ? "text-red-600" : "text-gray-600"}`}>
                        {packsAvailable > 0 ? (
                            <>
                                Only <span className="font-semibold">{packsAvailable} packs</span> left!
                                <br /> Order soon.
                            </>
                        ) : (
                            "Out of stock"
                        )}
                    </div>
                </div>
                <button
                    className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-2 hover:bg-primary hover:text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:ring-0"
                    disabled={packsAvailable === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Add;
