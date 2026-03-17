"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as motion from "motion/react-client"

export interface fakeCategory {
    id: number;
    img: string;
    name: string
}
const BrowseCategory = () => {
    const [categories, setCategories] = useState<fakeCategory[]>([]);

    useEffect(() => {
        setCategories([{
            id: 1,
            img: '/categories/shirts.jpg',
            name: 'clothes'
        }, {
            id: 2,
            img: '/categories/electronics.jpg',
            name: 'electronics'
        }, {
            id: 3,
            img: '/categories/furniture.jpg',
            name: 'furniture'
        }, {
            id: 4,
            img: '/categories/accessories.jpg',
            name: 'accessories'
        },])
    }, []);

    const spans = [
        "lg:col-span-1",
        "lg:col-span-2",
        "lg:col-span-2",
        "lg:col-span-1"
    ];

    return (

        <div   id="categories" className="w-[90%] mx-auto mt-[100px] bg-[#f0f0f0]  p-8 rounded-lg overflow-hidden">
            <motion.section initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} >
                <h1 className="flex justify-center items-center mb-8 text-[35px] font-[900] uppercase">Browse By Category</h1>
            </motion.section >
            <motion.section initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: .7 }} >

                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <li
                            key={category.id}
                            className={`${spans[index]} relative h-[200px] rounded-xl overflow-hidden `}
                        >
                            <Link href={`/all-products/${category.name}`}>
                                <h1 className="absolute top-4 font-[700] left-4 text-lg">
                                    {category.name}
                                </h1>
                                <Image
                                    height={100} width={200}
                                    src={category.img}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                            </Link>

                        </li>
                    ))}
                </ul>
            </motion.section >
        </div>
    );
};

export default BrowseCategory;