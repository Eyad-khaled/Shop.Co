"use client"

import Link from "next/link";
import { Item } from "./NavBar";
import SplitText from "./SplitText";
import { forwardRef, useEffect, useState } from "react";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

interface SideBarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    items: Item[];
}

const categories = [
    { name: "clothes", href: "/all-products/clothes" },
    { name: "electronics", href: "/all-products/electronics" },
    { name: "furniture", href: "/all-products/furniture" },
    { name: "accessories", href: "/all-products/accessories" },
];

const SideBar = forwardRef<HTMLDivElement, SideBarProps>(
    ({ isOpen, setIsOpen, items }, ref) => {
        useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }

            return () => {
                document.body.style.overflow = "";
            };
        }, [isOpen]);

        const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

        const handleAnimationComplete = () => {
            console.log("All letters animated");
        };

        return (
            <div
                ref={ref}
                className={`fixed top-0 left-0 h-full w-64 bg-[#ececec] shadow-lg dark:bg-[#262424]
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out z-50`}
            >
                <ul className="flex flex-col px-8 py-10 gap-4 text-2xl font-semibold">

                    {items.map((item: Item) => (
                        <li key={item.href} onClick={() => setIsOpen(false)}>
                            <Link href={item.href}>
                                {isOpen ? (
                                    <SplitText
                                        text={item.name}
                                        className="text-2xl font-semibold"
                                        delay={50}
                                        duration={1.25}
                                        ease="power3.out"
                                        splitType="chars"
                                        from={{ opacity: 0, y: 40 }}
                                        to={{ opacity: 1, y: 0 }}
                                        threshold={0.1}
                                        rootMargin="-100px"
                                        onLetterAnimationComplete={handleAnimationComplete}
                                    />
                                ) : (
                                    item.name
                                )}
                            </Link>
                        </li>
                    ))}

                    {/* Categories dropdown */}
                    <li>
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsCategoriesOpen(!isCategoriesOpen);
                            }}
                        >
                            <span>Categories</span>

                            <KeyboardArrowDownOutlinedIcon
                                className={`transition-transform ${isCategoriesOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </div>


                        <ul
                            className={`flex flex-col gap-2 mt-6 pl-4 text-lg font-medium transition-all duration-300
  ${isCategoriesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
  `}
                        >
                            {categories.map((cat) => (
                                <li key={cat.href}>
                                    <Link href={cat.href}>

                                        <SplitText
                                            text={cat.name}
                                            className="text-xlg font-semibold"
                                            delay={50}
                                            duration={1.25}
                                            ease="power3.out"
                                            splitType="chars"
                                            from={{ opacity: 0, y: 40 }}
                                            to={{ opacity: 1, y: 0 }}
                                            threshold={0.1}
                                            rootMargin="-100px"
                                            onLetterAnimationComplete={handleAnimationComplete}
                                        />

                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </li>

                </ul>
            </div>
        );
    });

export default SideBar;