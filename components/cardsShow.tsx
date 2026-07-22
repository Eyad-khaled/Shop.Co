"use client";
import { Product } from "@/app/interfaces/product";
import ProductCard from "./productCard";
import Link from "next/link";


// import * as motion from "motion/react-client"

interface CardsShowProps {
  products: Product[];
  title: string;
  href?: string;
}

const CardsShow = ({ products, title, href }: CardsShowProps) => {
  return (
    // <motion.section initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>

    <div className="w-full overflow-auto lg:flex lg:justify-center lg:items-center">
      <div className="bg-white mt-20 w-[95%] lg:flex lg:justify-center lg:items-center flex-col">
        <h1
          className="flex justify-center items-center mb-8 text-[18px] lg:text-[25px] font-[900] uppercase text-center"
        >
          {title}
        </h1>
        <ul className="flex lg:w-[70vw] justify-around items-center lg:justify-center lg:gap-4 overflow-x-auto overflow-y-hidden lg:overflow-hidden gap-6 px-6 lg:px-0 pb-10 [touch-action:pan-x]">
          {products.slice(0, 4).map((product) => (
            <li key={product.id} className="min-w-[150px] basis-1/5 product">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
        {/* {href && (
          <div className="flex justify-center items-center mt-10">
            <Link
              href={`/all-products/${href}`}
              className="flex justify-center items-center text-[18px] w-[90%] lg:w-[40%] py-4 px-[50px] rounded-[50px] border"
            >
              View All
            </Link>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CardsShow;
