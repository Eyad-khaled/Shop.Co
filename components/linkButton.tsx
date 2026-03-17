"use client";
import Link from "next/link";


interface LinkButtonProps {
    text: string;
    href: string;
}

const LinkButton = ({ text, href }: LinkButtonProps) => {
    return (
        <div className="">


            <Link className=" w-full sm:w-[200px] h-[50px] rounded-[100px] bg-black text-white flex items-center justify-center mt-2" href={href}>{text}</Link>
        </div>

    );
};

export default LinkButton;