"use client"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/store/store"
import { removeFromCart, addToCart, decreaseOne } from "@/app/features/cartSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from "next/link";

const CartItems = () => {
    const cart = useSelector((state: RootState) => state.CartReducer.items)
    const dispatch = useDispatch()
    const [isMounted, setIsMounted] = useState(false)
    const subtotal = cart.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)
    const discountTotal = cart.reduce((acc, item) => {
        const itemDiscount =
            item.product.price *
            (item.product.discountPercentage / 100)

        return acc + itemDiscount * item.quantity
    }, 0)
    const shipping = subtotal > 100 ? 10 : 0
    const total = subtotal + shipping - discountTotal
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null // prevents server/client mismatch


    return (
        <div className="mt-16 text-start">

            <h1 className=" pl-20 mb-8 text-[25px] font-[900] uppercase">Your Cart</h1>
            <div className="mt-6 flex items-start w-full lg:w-[90%] mx-auto lg:flex-row flex-col gap-6">
                <div className="basis-1/2">
                    <div className="cart border flex flex-col gap-10 rounded-md px-6 py-5">

                        {cart.map((e) => (
                            <div key={e.product.id} className="flex items-center w-full relative">
                                <div className="h-px bg-black/20 self-stretch absolute bottom-[-20px] w-full " />
                                <div className="flex w-full gap-4">

                                    <div className="bg-[#f0f0f0] rounded-lg">

                                        <Image className="h-full w-auto" src={e.product.images[0]} width={100} height={100} alt={e.product.title} />
                                    </div>
                                    <div className="text flex flex-col gap-4 flex-grow">
                                        <div className="flex justify-between items-center">
                                            <h1 className="font-bold max-w-[80%]">{e.product.title}</h1>
                                            <div className="cursor-pointer" onClick={() => dispatch(removeFromCart(e.product.id))}>
                                                <DeleteIcon color="error" />
                                            </div>
                                        </div>
                                        <div className="info">
                                            <p className="font-semibold">Brand : <span className="opacity-60">{e.product.brand}</span></p>
                                            <p className="font-semibold">Category : <span className="opacity-60">{e.product.category}</span> </p>
                                        </div>
                                        <div className="price font-bold text-lg flex justify-between items-center">
                                            <div className="flex items-center gap-4">

                                            <h1 className="current-price text-[16px] font-[600]">${((e.product.price * ((100 - e.product.discountPercentage) / 100)) * e.quantity).toFixed(2)}</h1>
                                            <h1 className="current-price text-[16px] font-[600] opacity-40 line-through">${(e.product.price * e.quantity).toFixed(2)}</h1>
                                            </div>
                                            <div className="quantity flex justify-between items-center basis-1/3 px-4 bg-[#F0EEED] rounded-[50px] py-2">
                                                <div className="cursor-pointer" onClick={() => e.quantity > 1 ? dispatch(decreaseOne({ product: e.product, quantity: 1 })) : console.log('cant reduce again')}>
                                                    <RemoveIcon />
                                                </div>
                                                <div className="number font-semibold">{e.quantity}</div>
                                                <div className="cursor-pointer" onClick={() => dispatch(addToCart({ product: e.product, quantity: 1 }))}>

                                                    <AddIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                </div>
                <div className="checkout border flex flex-col gap-4 rounded-md p-6 w-full lg:basis-1/3">
                    <h1 className=" mb-8 text-[25px] font-[700] ">Order Summary</h1>
                    <div className="mt-6 relative">


                        <div className="flex justify-between items-center">
                            <p className="opacity-60 ">SubTotal : </p>
                            <p className="text-lg font-bold">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center my-4">
                            <p className="opacity-60 ">Discount : </p>
                            <p className="text-lg font-bold">${discountTotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between items-center pb-4">
                            <p className="opacity-60 ">Shipping Fees : </p>
                            <p className="text-lg font-bold">${shipping.toFixed(2)}</p>
                        </div>
                        <div className="h-px bg-black/20 self-stretch absolute bottom-[0] w-full " />


                    </div>
                    <div className="total">
                        <div className="flex justify-between items-center">
                            <p className="">Total : </p>
                            <p className="text-lg font-bold">${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="Checkout">
                        <Link href="/checkout">
                            <div className="add-to-cart cursor-pointer flex-grow text-center bg-black text-white rounded-[50px] py-4 flex gap-4 items-center justify-center">
                                <button>Go To Checkout</button>
                                <ArrowForwardIcon />
                            </div>
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CartItems