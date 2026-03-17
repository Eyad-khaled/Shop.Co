import LinkButton from "@/components/linkButton";
import CountUp from '@/components/CountUp';
import Image from "next/image";
import Banner from "./banner";

const Landing = () => {
    return (
        <div className="overflow-hidden">

            <div className="flex p-0 w-full flex flex-col lg:flex-row gap-4 md:h-[calc(100vh-146px)] h-[calc(100vh-145px)] md:pt-4 md:px-16 bg-[#F2F0F1]">

                {/* Left side - fixed so it never overflows */}
                <div className="text-side p-[5px] flex flex-col basis-[60%] justify-center animate-[slide-in-left_0.8s_ease-in-out_forwards]">
                    <h1 className="font-[900] text-[40px] leading-tight">
                        Find Clothes That <br /> Matches Your Style
                    </h1>
                    <p className="opacity-70 mt-3 max-w-[480px]">
                        Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                    </p>
                    <div className="mt-4">
                        <LinkButton text="Shop Now" href="#categories" />
                    </div>

                    <div className="flex justify-center md:justify-start gap-6 mt-6 flex-wrap">
                        <div className="flex flex-col gap-1">
                            <div className="font-[600] text-[28px]">
                                {/* @ts-ignore */}
                                <CountUp from={0} to={100} separator="," direction="up" duration={1.9} className="count-up-text" startCounting={false} />+
                            </div>
                            <p className="opacity-70 text-sm">International Brands</p>
                        </div>

                        <div className="w-px bg-black/20 self-stretch" /> {/* divider */}

                        <div className="flex flex-col gap-1">
                            <div className="font-[600] text-[28px]">
                                {/* @ts-ignore */}
                                <CountUp from={0} to={2000} separator="," direction="up" duration={0.5} className="count-up-text" startCounting={false} />+
                            </div>
                            <p className="opacity-70 text-sm">High-Quality Products</p>
                        </div>

                        <div className="w-px bg-black/20 self-stretch hidden md:block" /> {/* divider */}

                        <div className="flex flex-col gap-1">
                            <div className="font-[600] text-[28px]">
                                {/* @ts-ignore */}
                                <CountUp from={0} to={30000} separator="," direction="up" duration={0.3} className="count-up-text" startCounting={false} />+
                            </div>
                            <p className="opacity-70 text-sm">Happy Customers</p>
                        </div>
                    </div>
                </div>

                {/* Right side - image fills its container naturally */}
                <div className="image-side animate-[slide-in-right_0.8s_ease-in-out_forwards] basis-[40%] relative flex items-center justify-center">
                    <Image src="/landing/star-removebg-preview.png" className="absolute z-[100] lg:top-[50px] top-0 right-0 lg:right-[40px]" alt="star" width={50} height={50} />
                    <Image src="/landing/star-removebg-preview.png" className="absolute z-[100] bottom-[0px] lg:bottom-[40px] left-0 lg:left-[-20px]" alt="star" width={50} height={50} />
                    <div className="absolute bottom-0 left-0 w-full h-full flex justify-center">
                        <Image
                            src="/landing/bg-image-removebg-preview.png"
                            alt="bg image"
                            fill
                            className="object-contain object-bottom"
                            priority
                        />
                    </div>

                </div>

            </div>
            <Banner />
        </div>
    );
};

export default Landing;