"use client"
import Link from "next/link";
// import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Dialog } from 'primereact/dialog';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import Image from "next/image";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CategoriesMenu from "./categoriesMenu";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SideBar from "./sidebar";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { LogoutButton } from "./logout-button";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";


export interface Item {
    name: string;
    href: string;
}
const NavBar = () => {
    const cart = useSelector((state: RootState) => state.CartReducer.items)
    const router = useRouter();
    //vars
    const items: Item[] = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '#categories' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];
    //states
    const [mount, setmount] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [IsSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
    const categoriesRef = useRef<HTMLLIElement | null>(null);
    const sidebarRef = useRef<HTMLDivElement | null>(null);
    const [isMounted, setIsMounted] = useState(false)
    const totalCartItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
);

    //isuser logged in or not
    useEffect(() => {
        setIsMounted(true)
    }, [])


    useEffect(() => {
        const supabase = createClient();

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            setIsLoggedIn(!!user);

            if (user?.user_metadata?.avatar_url) {
                setUserImageUrl(user.user_metadata.avatar_url);
            }

            setLoading(false);
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            const user = session?.user;

            setIsLoggedIn(!!user);

            if (user?.user_metadata?.avatar_url) {
                setUserImageUrl(user.user_metadata.avatar_url);
            } else {
                setUserImageUrl(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);
    //watchers
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                categoriesRef.current &&
                !categoriesRef.current.contains(event.target as Node)
            ) {
                setIsCategoriesOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsSideBarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    //Functions 
    const handleCartClick = () => {
        if (!isLoggedIn) {
            setDialogVisible(true);
        } else {
            router.push("/cart");
        }
    }
    if (!isMounted) return null
    return (
        <div className="bg-white sticky top-0 z-[999999999999999999999999999999999] shadow-lg">
            {(IsSideBarOpen || isCategoriesOpen) && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40"
                    onClick={() => {
                        setIsSideBarOpen(false)
                        setIsCategoriesOpen(false)
                    }}
                />
            )}
            <nav className="relative flex items-center justify-between py-4 px-2">
                <div className="flex justify-center items-center gap-2">
                    <div className="sm:hidden flex" onClick={() => setIsSideBarOpen(!IsSideBarOpen)}>
                        <MenuOutlinedIcon className="sm:hidden block cursor-pointer" />

                        <SideBar ref={sidebarRef} isOpen={IsSideBarOpen} setIsOpen={setIsSideBarOpen} items={items} />
                    </div>
                    <Link href="/"><h1 className="font-[700] text-2xl">Shop.Co</h1></Link>
                </div>
                <ul className="sm:flex hidden items-center gap-6 text-md font-[500] ">
                    {items.map((item: Item) => (
                        <li key={item.href} className="hover:underline underline-offset-8 decoration-2 decoration-dark-900 font-[500] text-dark-900 cursor-pointer">
                            <Link href={item.href}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li
                        ref={categoriesRef}
                        className="items-center gap-1 cursor-pointer font-[500] text-dark-900 hidden sm:flex"
                    >
                        <div className="flex" onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>

                            <h1>Categories</h1>
                            <div className={` ${isCategoriesOpen ? 'rotate-180' : ''} transition duration-300 ease-in-out`}>
                                <KeyboardArrowDownOutlinedIcon />
                            </div>
                        </div>
                        <CategoriesMenu isCategoriesOpen={isCategoriesOpen} setIsCategoriesOpen={setIsCategoriesOpen} />
                    </li>
                </ul>
                <div className="icons flex items-center gap-4">
                    <div className="cursor-pointer" onClick={handleCartClick}>
                        <ShoppingCartOutlinedIcon fontSize='small' />({totalCartItems})
                    </div>
                    <Dialog visible={dialogVisible} style={{ width: '80vw' }} onHide={() => { if (!dialogVisible) return; setDialogVisible(false); }}>
                        <div className="p-4 flex flex-col gap-4 bg-white rounded-md">
                            <p>
                                To view your cart, please log in or sign up for an account. This will allow you to save your cart and access it from any device. Thank you for shopping with us!
                            </p>
                            <div className="flex gap-2" onClick={() => setDialogVisible(false)}>
                                <Button asChild size="sm" variant={"outline"}>
                                    <Link href="/auth/login">Sign in</Link>
                                </Button>
                                <Button asChild size="sm" variant={"default"}>
                                    <Link href="/auth/sign-up">Sign up</Link>
                                </Button>
                            </div>
                        </div>

                    </Dialog>

                    {/* <AnimatedThemeToggler /> */}
                    {loading ? (
                        <div className="w-8 h-8"><RefreshOutlinedIcon className="animate-spin" /></div> // placeholder
                    ) : isLoggedIn && userImageUrl ? (
                        <div className="flex justify-center items-center gap-2">

                            <LogoutButton />
                            <Link href="/profile">
                                <Image
                                    src={userImageUrl}
                                    alt="User Avatar"
                                    className="rounded-full"
                                    width={32}
                                    height={32}
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Button asChild size="sm" variant={"outline"}>
                                <Link href="/auth/login">Sign in</Link>
                            </Button>
                            <Button asChild size="sm" variant={"default"}>
                                <Link href="/auth/sign-up">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default NavBar;