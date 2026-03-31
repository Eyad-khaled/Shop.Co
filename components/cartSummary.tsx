"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/app/interfaces/product";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
    product: Product
    quantity: number
}

interface CartSummaryProps {
    items: CartItem[];
    shipping: number;     // 0 for free, 9 for express, etc.
    taxes: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CartSummary({
    items,
    shipping,
    taxes,

}: CartSummaryProps) {
    const [discountCode, setDiscountCode] = useState("");

    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const total = subtotal + shipping + taxes;

    const handleApplyDiscount = () => {
        // TODO: dispatch discount code to Redux or call your API
        console.log("Applying discount:", discountCode);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Your Cart</h2>

            {/* Items */}
            <div className="space-y-4 mb-5">
                {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                        {/* Image with badge */}
                        <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                    src={item.product.images[0]}
                                    alt={item.product.title}
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            {/* Quantity badge */}
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {item.quantity}
                            </span>
                        </div>

                        {/* Name & variant */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                            <p className="text-xs text-gray-500 truncate">{item.product.category}</p>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-medium text-gray-900 shrink-0">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            {/* Discount code */}
            <div className="flex gap-2 mb-5">
                <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
                    {/* Ticket icon */}
                    <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Discount code"
                        className="flex-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                    />
                </div>
                <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    Apply
                </button>
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-gray-200 pt-4 mb-5">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                        Estimated taxes
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
                        </svg>
                    </span>
                    <span className="font-medium text-gray-900">${taxes.toFixed(2)}</span>
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-5">
                <span className="text-base font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>

            {/* CTA */}
            <button
                onClick={() => console.log('done !')
                }
                className="cursor-not-allowed w-full bg-gray-900 text-white text-sm font-semibold py-3.5 rounded-lg hover:bg-gray-700 active:scale-[0.99] transition-all"
            >
                Continue to Payment
            </button>
        </div>
    );
}