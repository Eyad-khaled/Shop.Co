"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import * as motion from "motion/react-client"

export interface fakeCategory {
  id: number;
  img: string;
  name: string;
  title?: string;
}
const categories = [
  {
    id: 1,
    img: "/categories/shirts.jpg",
    name: "clothes",
    title: "Dress Bold. Wear Your Style.",
  },
  {
    id: 2,
    img: "/categories/electronics.jpg",
    name: "electronics",
    title: "Power Up with the Latest Tech.",
  },
  {
    id: 3,
    img: "/categories/furniture.jpg",
    name: "furniture",
    title: "Turn Every Room into Home.",
  },
  {
    id: 4,
    img: "/categories/accessories.jpg",
    name: "accessories",
    title: "The Finishing Touch That Matters.",
  },
];
gsap.registerPlugin(ScrollTrigger);
const BrowseCategory = () => {
  const spans = [
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-2",
    "lg:col-span-1",
  ];
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".category");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#categories",
        start: "top 10%",
        end: `${sections.length * 500}px`,
        scrub: true,
        pin: true,
        markers: true,
        pinSpacing: false,
      },
    });
    console.log(sections.length);
    sections.forEach((section, i) => {
      tl.set(section, {
        zIndex: sections.length - i,
      });

      if (i !== sections.length - 1) {
        tl.to(section, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          delay:0.5
        });
      }
    });
  });
  return (
    <div
      id="categories"
      className="w-[100%] mx-auto mt-[100px] bg-[white]  pb-8 rounded-lg"
    >
      <div>
        <h1 className="flex justify-center items-center mb-6 text-[35px] font-[900] uppercase">
          View all Categories
        </h1>
      </div>
      <div id="container" className="relative h-screen">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`${spans[index]} absolute h-[80vh] w-full category flex justify-center items-center`}
            style={{ zIndex: -index }}
          >
          {/* <Link href={`/all-products/${category.name}`} className="w-full h-screen"> */}
              <h1
                className="absolute left-1/2 top-16 -translate-x-1/2
               text-5xl lg:text-6xl
               font-black uppercase tracking-[0.2em]
               text-white
               drop-shadow-[0_4px_20px_rgba(0,0,0,.45)]
               text-center"
              >
                {category.title}
              </h1>
            <div className="flex justify-center items-center mt-10 absolute bottom-16 left-1/2 -translate-x-1/2 w-full">
              <Link
                href={`/all-products/${category.name}`}
                className="flex justify-center items-center text-[18px] w-[90%] lg:w-[40%] py-4 px-[50px] rounded-[50px] border "
              >
                View All
              </Link>
            </div>
            <Image
              height={100}
              width={200}
              src={category.img}
              alt={category.name}
              className="w-full h-full object-cover"
            />
        {/* </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
