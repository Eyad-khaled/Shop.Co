// app/shipping/page.tsx  (or pages/shipping.tsx for Pages Router)
// Wire CartSummary props to your Redux store using useSelector
"use client"
import ShippingForm from "@/components/shipping";
import CartSummary from "@/components/cartSummary"; 
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ShippingPage() {
    // TODO: Replace these with useSelector() calls from your Redux store
    // const items    = useSelector((state: RootState) => state.cart.items);
    const items = useSelector((state: RootState) => state.CartReducer.items)
    // const shipping = useSelector((state: RootState) => state.cart.shippingCost);
    // const taxes    = useSelector((state: RootState) => state.cart.taxes);

    return (
        <div className="min-h-screen bg-gray-100 ">
            {/* Navbar placeholder — replace with your real Navbar component */}

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="bg-white rounded-2xl shadow-sm p-8 flex gap-10 flex lg:flex-row flex-col">
                    {/* Left: Shipping form — 60% */}
                    <div className="flex-[3]">
                        <ShippingForm />
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gray-200 shrink-0" />

                    {/* Right: Cart summary — 40% */}
                    <div className="flex-[2]">
                        <CartSummary
                            items={items}        // ← swap with Redux selector
                            shipping={9}         // ← swap with Redux selector
                            taxes={5}            // ← swap with Redux selector
                           
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}