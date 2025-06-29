"use client";

import React, { useState } from "react";

const Add = () => {
    const [quantity, setQuantity] = useState(1);
    const stock = 4;

    // Handle increment/decrement logic
    const handleQuantity = (type: "i" | "d") => {
        if (type === "d" && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
        if (type === "i" && quantity < stock) {
            setQuantity((prev) => prev + 1);
        }
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
                    <div className="text-xs">
                        Only <span className="text-accent font-semibold">{stock} items</span> left!
                        <br /> {"Don't"} miss it
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-2 hover:bg-primary hover:text-white transition disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white disabled:ring-0"
                    disabled={stock === 0}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Add;
