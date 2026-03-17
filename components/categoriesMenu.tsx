"use client"

import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fakeCategory } from "./browseCategory";


interface CategoryMenu {
    isCategoriesOpen: boolean;
    setIsCategoriesOpen: Dispatch<SetStateAction<boolean>>
}
const CategoriesMenu = ({ isCategoriesOpen, setIsCategoriesOpen }: CategoryMenu) => {
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

    return (
        <ul className={`dark:bg-[#272121] flex-wrap bg-[#ececec] absolute z-[10000000] top-full left-[50%] shadow-lg rounded-md p-4 mt-2 flex justify-around w-[90%] transition-all duration-500 ease-in-out translate-x-[-50%] ${isCategoriesOpen ? 'opacity-1 pointer-cursor translate-y-[0px]' : 'opacity-0 pointer-events-none translate-y-[50px]'}`}>
            {categories.map((category: fakeCategory) => (
                <li key={category.id}>
                    <Link href={`/all-products/${category.name}`} onClick={() => setIsCategoriesOpen(false)} className="flex flex-col items-center gap-2 h-full"  >

                        <p className="font-[600] capitalize">{category.name}</p>
                        <Image src={category.img} alt={category.name} width={150} height={150} className="rounded-sm transition-all duration-300 ease-in-out hover:scale-[1.1] h-full" />
                    </Link>

                </li>
            ))}


        </ul>
    );
};

export default CategoriesMenu;