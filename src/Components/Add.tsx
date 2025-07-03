"use client";

import React, { useState } from "react";
import { useCartStore } from "@/utils/store"; // ensure your store.ts path is correct

interface AddProps {
    productId: string;
    productTitle: string;
    productImage?: string;
    selectedPack: number;
    selectedPackLabel: string;
    selectedPackPrice: number;
    stockAvailable: number; // packsAvailable
}

const Add: React.FC<AddProps> = ({
    productId,
    productTitle,
    productImage,
    selectedPack,
    selectedPackLabel,
    selectedPackPrice,
    stockAvailable,
}) => {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < stockAvailable) {
            setQuantity((prev) => prev + 1);
        }
    };

    const handleAddToCart = () => {
        if (stockAvailable === 0) return;

        addToCart({
            id: productId,
            title: productTitle,
            img: productImage,
            price: selectedPackPrice,
            optionTitle: selectedPackLabel,
            quantity,
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Section Heading */}
            <h4 className="font-semibold text-primary">Choose a Quantity</h4>

            {/* Quantity Selector and Stock Message */}
            <div className="flex justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    {/* Quantity Controls */}
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

                    {/* Stock Message */}
                    {stockAvailable > 0 ? (
                        <div className={`text-xs ${stockAvailable < 50 ? "text-red-500" : "text-gray-600"}`}>
                            Only{" "}
                            <span className="font-semibold">
                                {stockAvailable} pack{stockAvailable !== 1 && "s"}
                            </span>{" "}
                            left!
                            <br /> {stockAvailable < 50 && "Order soon!"}
                        </div>
                    ) : (
                        <div className="text-xs text-red-500">Out of stock</div>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-2 hover:bg-primary hover:text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:ring-0"
                    disabled={stockAvailable === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Add;
