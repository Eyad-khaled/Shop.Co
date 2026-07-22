"use client"
import { Product } from "@/app/interfaces/product";
import Image from "next/image";
import Link from "next/link";

import StarRating from "./starsRating";

interface ProductCardProps {
    product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
    return (
            <div className="">
                <Link className="cursor-pointer" href={`/product/${product.id}`} >
                    <div className="image  rounded-md overflow-hidden w-fit bg-[#f0f0f0]"  >
                        <Image className=" rounded-md hover:scale-[1.1] transition-all duration-500 ease-in-out" src={product.images[0]} alt={product.title} height={200} width={200}></Image>
                    </div>
                    <div className="text pt-4 flex justify-between flex-col gap-[20px]">
                        <h1 className="font-[700] opacity-70 text-[14px] max-w-full h-[40px]">{product.title}</h1>
                        <div className="">

                        <p className="font-[700] text-[16px]"> ${product.price}</p>
                        <div className="stars-rating">
                            <StarRating rating={product.rating} />
                        </div>
                        </div>
                    </div>
                </Link>
            </div >
        
    );
};

export default ProductCard;