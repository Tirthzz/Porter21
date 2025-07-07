"use client";

import React from "react";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
    const router = useRouter();

    if (cart.products.length === 0) {
        return (
            <div className="p-6 max-w-3xl mx-auto text-center">
                <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                <p>Your cart is empty. Start adding your favorite bottles!</p>
                <button
                    onClick={() => router.push("/")}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto flex flex-col gap-4 h-[calc(100vh-80px)]">
            <h1 className="text-3xl font-semibold">Your Cart</h1>

            {/* Scrollable Product List */}
            <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-1 border rounded-lg p-3">
                {cart.products.map((item) => (
                    <div
                        key={item.id + item.optionTitle}
                        className="flex justify-between items-center border-b pb-3 last:border-b-0"
                    >
                        <div className="flex items-center gap-3">
                            {item.img && (
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={60}
                                    height={80}
                                    className="rounded object-cover"
                                />
                            )}
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.optionTitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 border rounded hover:bg-gray-100"
                            >
                                +
                            </button>
                            <span className="min-w-[60px] text-right font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 text-xs hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky Checkout Section */}
            <div className="sticky bottom-0 bg-white border-t pt-3 pb-6 flex flex-col gap-2 items-center shadow-inner">
                <div className="text-sm text-gray-700">
                    Total Items: <span className="font-medium">{cart.totalItems}</span>
                </div>
                <div className="text-lg font-semibold">
                    Total Price: ${cart.totalPrice.toFixed(2)}
                </div>
                <button
                    onClick={() => router.push("/checkout")}
                    className="mt-2 w-[90%] sm:w-1/2 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                    Proceed to Checkout
                </button>
                <button
                    onClick={clearCart}
                    className="text-xs text-gray-500 hover:text-red-500 transition mt-1"
                >
                    Clear Cart
                </button>
            </div>
        </div>
    );
};

export default CartPage;
