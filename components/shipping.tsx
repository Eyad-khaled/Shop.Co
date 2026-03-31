"use client";

import { useState } from "react";

type ShippingMethod = "free" | "express";

export default function ShippingForm() {
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("express");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "IND",
        city: "",
        state: "",
        zipCode: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
        // TODO: dispatch to Redux or call your API
        console.log({ form, shippingMethod });
    };

    return (
        <div className="w-full">
            {/* Breadcrumb */}
            

            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Address</h1>

            <div className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <select
                                name="countryCode"
                                value={form.countryCode}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-2 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
                            >
                                <option value="IND">IND</option>
                                <option value="EGY">EGY</option>
                                <option value="USA">USA</option>
                                <option value="GBR">GBR</option>
                            </select>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="+91 0000000000"
                                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                            />
                        </div>
                    </div>
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            placeholder="Cairo"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            State <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                            placeholder="Giza"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="zipCode"
                            value={form.zipCode}
                            onChange={handleChange}
                            placeholder="12511"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Enter a description..."
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                    />
                </div>
            </div>

            {/* Shipping Method */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Method</h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: "free" as ShippingMethod, label: "Free Shipping", sub: "7–20 Days", price: "$0" },
                        { id: "express" as ShippingMethod, label: "Express Shipping", sub: "1–3 Days", price: "$9" },
                    ].map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => setShippingMethod(option.id)}
                            className={`flex items-center justify-between border rounded-lg px-4 py-4 text-left transition cursor-pointer ${shippingMethod === option.id
                                    ? "border-gray-900 bg-gray-50"
                                    : "border-gray-200 hover:border-gray-400"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${shippingMethod === option.id ? "border-gray-900" : "border-gray-300"
                                        }`}
                                >
                                    {shippingMethod === option.id && (
                                        <div className="w-2 h-2 rounded-full bg-gray-900" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{option.label}</p>
                                    <p className="text-xs text-gray-500">{option.sub}</p>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{option.price}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}