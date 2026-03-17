"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface icon {
    href: string;
    icon: string;
    id: number;
    name: string
}
interface li {
    href: string;
    title: string;
    id: number
}
interface ul {
    header: string;
    lis: li[];
    id: number
}
const Footer = () => {
    const [icons, setIcons] = useState<icon[]>([])
    const [uls, setUls] = useState<ul[]>([])
    useEffect(() => {

        setIcons([{
            href: 'https://www.facebook.com/',
            icon: '/footer-icons/facebook.png',
            id: 1,
            name: "facebook"
        }, {
            href: 'https://www.instagram.com/',
            icon: '/footer-icons/instagram.png',
            id: 2,
            name: "instagram"
        }, {
            href: 'https://www.github.com/',
            icon: '/footer-icons/github.png',
            id: 3,
            name: "github"
        }, {
            href: 'https://www.x.com/',
            icon: '/footer-icons/twitter.png',
            id: 4,
            name: "x"
        },])

        setUls([
            {
                header: ' company',
                id: 1,
                lis: [
                    {
                        title: "about",
                        href: '/about',
                        id: 1
                    },
                    {
                        title: "features",
                        href: '/',
                        id: 2
                    },
                    {
                        title: "works",
                        href: '/',
                        id: 3
                    },
                    {
                        title: "career",
                        href: '/',
                        id: 4
                    },
                ]
            },
            {
                header: ' help',
                id: 2,
                lis: [
                    {
                        title: "customer support",
                        href: '/',
                        id: 1
                    },
                    {
                        title: "delivery details",
                        href: '/',
                        id: 2
                    },
                    {
                        title: "terms & conditions",
                        href: '/',
                        id: 3
                    },
                    {
                        title: "privacy policy",
                        href: '/',
                        id: 4
                    },
                ]
            },
            {
                header: ' faq',
                id: 3,
                lis: [
                    {
                        title: "account",
                        href: '/profile',
                        id: 1
                    },
                    {
                        title: "manage deliveries",
                        href: '/',
                        id: 2
                    },
                    {
                        title: "orders",
                        href: '/',
                        id: 3
                    },
                    {
                        title: "payments",
                        href: '/',
                        id: 4
                    },
                ]
            },
            {
                header: ' resources',
                id: 4,
                lis: [
                    {
                        title: "free ebooks",
                        href: '/',
                        id: 1
                    },
                    {
                        title: "development toturial",
                        href: '/',
                        id: 2
                    },
                    {
                        title: "how to blog",
                        href: '/',
                        id: 3
                    },
                    {
                        title: "youtube playlist",
                        href: '/',
                        id: 4
                    },
                ]
            },
        ])
    }, [])
    return (
        <div className="bg-[#f0f0f0] flex justify-evenly items-center gap-10 flex-wrap flex-col lg:flex-row mt-[150px] pb-10 rounded-lg">
            <div className="flex flex-col justify-around items-start basis-[30%] p-4">
                <h1 className="text-[35px] font-[900] uppercase">SHOP.CO</h1>
                <p className="opacity-70 max-w-[480px]">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                <ul className="flex justify-center items-center gap-2 mt-8" >
                    {icons.map((e) => (
                        <li key={e.id}>
                            <Link href={e.href}>
                                <Image src={e.icon} width={25} height={25} alt={e.name} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">

                {uls.map((ul) => (
                    <div key={ul.id} className="w-[150px]">

                        <h1 className="text-[16px] font-semibold uppercase pb-4 ">{ul.header}</h1>
                        <ul>
                            {ul.lis.map((item) => (
                                <li key={item.id} className="pt-2">
                                    <Link href={item.href}>
                                        <p className="opacity-70">
                                            {item.title}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Footer;