"use client"
import { Product } from "@/app/interfaces/product";
import ProductCard from "./productCard";
import Link from "next/link";
import * as motion from "motion/react-client"

interface CardsShowProps {
    products: Product[];
    title: string;
    href?:string
}
const CardsShow = ({ products, title ,href }: CardsShowProps) => {
    return (
        <motion.section initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} >


            <div className="bg-white mt-20 w-[95%]">
                <h1 className="flex justify-center items-center mb-8 text-[25px] font-[900] uppercase">{title}</h1>
                <ul className="flex justify-around items-center lg:justify-center lg:gap-8 overflow-x-auto overflow-y-hidden lg:overflow-hidden gap-6 px-6 lg:px-0">
                    {products.slice(0, 4).map((product) => (
                        <li key={product.id} className="min-w-[150px] basis-1/5">

                            <ProductCard product={product} />
                        </li>
                    ))}
                </ul>
                {href && (
                    <div className="flex justify-center items-center mt-10">

                    <Link href={`/all-products/${href}`} className="flex justify-center items-center text-[18px] w-[90%] lg:w-[20%] py-4 px-[50px] rounded-[50px] border">View All</Link>
                </div>
                )}
                

            </div>
        </motion.section>
    );
};

export default CardsShow;