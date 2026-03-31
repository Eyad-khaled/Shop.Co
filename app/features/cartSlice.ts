"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from "@/app/interfaces/product";

// Define a type for the slice state

// store/cartSlice.ts

export interface CartItem {
    product: Product;
    quantity: number
}
interface CartState {
    items: CartItem[]
}

const savedCart = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cart") || "[]")
    : []

const initialState: CartState = {
    items: savedCart
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const product = action.payload.product
            const quantity = action.payload.quantity

            // check if product already in cart
            const existing = state.items.find(item => item.product.id === product.id)
            if (existing) {
                existing.quantity += quantity
            } else {
                state.items.push({ product, quantity: quantity })
            }

            // sync to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items))
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            // remove by product id
            state.items = state.items.filter(item => item.product.id !== action.payload)
            localStorage.setItem("cart", JSON.stringify(state.items))
        },
        decreaseOne: (state, action: PayloadAction<CartItem>) => {
            const product = action.payload.product
            const quantity = action.payload.quantity
            const existing = state.items.find(item => item.product.id === product.id)
            if (existing) {
                existing.quantity -= quantity
                // if (existing.quantity < 1) {
                //     removeFromCart(product.id)
                // }
            }
            localStorage.setItem("cart", JSON.stringify(state.items))
            // else if(existing.quantity === 1 ){
            //     removeFromCart(product.id)
            // }
        },
        clearCart: (state) => {
            state.items = []
            localStorage.setItem("cart", JSON.stringify([]))
        }
    }
})

export const { addToCart, removeFromCart, clearCart, decreaseOne } = cartSlice.actions
export default cartSlice.reducer


// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
