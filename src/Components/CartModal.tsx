"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type CartModalProps = {
    onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ onClose }) => {
    const cartItems = [1, 2]; // Replace with your actual cart state

    return (
        <div className="absolute top-14 right-4 w-80 max-w-[90vw] bg-white rounded-xl shadow-xl border border-gray-200 z-50 p-4 flex flex-col gap-4">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-6">Your cart is empty.</div>
            ) : (
                <>
                    <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
                    <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item} className="flex gap-3 items-center border-b pb-2 last:border-b-0">
                                <Image
                                    src="https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg"
                                    alt="Product"
                                    width={60}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-800">Product Name</span>
                                        <span className="text-sm text-gray-700">$49</span>
                                    </div>
                                    <span className="text-xs text-gray-500">Qty: 2</span>
                                    <button className="text-xs text-red-500 hover:underline self-start mt-1">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-3 text-sm text-gray-700">
                        <div className="flex justify-between font-semibold">
                            <span>Subtotal</span>
                            <span>$98</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Shipping and taxes calculated at checkout.</p>
                        <div className="flex flex-col gap-2 mt-3">
                            <Link
                                href="/cart"
                                className="w-full text-center py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition text-sm"
                            >
                                View Cart
                            </Link>
                            <Link
                                href="/checkout"
                                className="w-full text-center py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm"
                            >
                                Checkout
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartModal;