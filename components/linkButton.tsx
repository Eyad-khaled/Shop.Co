"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// import Link from "next/link";

interface LinkButtonProps {
  text: string;
  href: string;
}
gsap.registerPlugin(ScrollToPlugin) 
const LinkButton = ({ text, href }: LinkButtonProps) => {
  const handleClick = () => {
    gsap.to(window, { scrollTo: href, duration: 2 , ease:'power1.out' });
  };
  return (
    <div className="">
      <h1
        className=" w-full sm:w-[200px] h-[50px] rounded-[100px] bg-black text-white flex items-center justify-center mt-2 cursor-pointer"
        onClick={handleClick}
      >
        {text}
      </h1>
    </div>
  );
};

export default LinkButton;
