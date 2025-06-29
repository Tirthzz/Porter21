"use client";

import React from "react";
import Image from "next/image";

const CartModal = () => {
    const cartItems = true; // placeholder for future cart state integration

    return (
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-background border border-border top-12 right-0 flex flex-col gap-6 z-20">
            {!cartItems ? (
                <div className="text-text">Cart is Empty</div>
            ) : (
                <>
                    {/* Heading */}
                    <h2 className="text-xl font-semibold text-primary">Shopping Cart</h2>

                    {/* Cart Items List */}
                    <div className="flex flex-col gap-6">
                        {/* ITEM */}
                        {[1, 2].map((item) => (
                            <div key={item} className="flex gap-4">
                                <Image
                                    src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg"
                                    alt="Product Image"
                                    width={72}
                                    height={96}
                                    className="object-cover rounded-md"
                                />
                                <div className="flex flex-col justify-between w-full">
                                    {/* Title and Price */}
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className="font-semibold text-text">Product Name</h3>
                                        <div className="p-1 bg-footerbg border border-border rounded-sm text-text">$49</div>
                                    </div>
                                    {/* Availability */}
                                    <div className="text-sm text-textSecondary">Available</div>
                                    {/* Qty and Remove */}
                                    <div className="flex justify-between text-sm mt-1">
                                        <span className="text-textSecondary">Qty: 2</span>
                                        <button className="text-icon hover:underline transition">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Cart Subtotal and Actions */}
                        <div className="pt-2 border-t border-border">
                            <div className="flex items-center justify-between font-semibold text-text">
                                <span>Subtotal</span>
                                <span>$98</span>
                            </div>
                            <p className="text-textSecondary text-sm mt-2 mb-4">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <div className="flex gap-2 text-sm">
                                <button className="flex-1 rounded-md py-2 px-3 ring-1 ring-primary text-primary hover:bg-primary hover:text-white transition">
                                    View Cart
                                </button>
                                <button className="flex-1 rounded-md py-2 px-3 bg-primary text-white hover:bg-icon transition">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;
