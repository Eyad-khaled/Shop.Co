"use client";
import LinkButton from "@/components/linkButton";
import CountUp from "@/components/CountUp";
import Image from "next/image";
import Banner from "./banner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
const Landing = () => {
  useGSAP(() => {
    const counter_100 = { value: 0 };
    const hundred = document.getElementById("hundred");

    gsap.to(counter_100, {
      value: 100,
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        hundred.textContent = Math.floor(counter_100.value);
      },
    });
    const counter_2000 = { value: 0 };
    const twoThousand = document.getElementById("two-thousand");

    gsap.to(counter_2000, {
      value: 2000,
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        twoThousand.textContent = Math.floor(counter_2000.value);
      },
    });
    const counter_30000 = { value: 0 };
    const thirtyK = document.getElementById("thirty-k");

    gsap.to(counter_30000, {
      value: 30000,
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        thirtyK.textContent = Math.floor(counter_30000.value);
      },
    });
  });
  useGSAP(() => {
    const title = document.querySelector(".title");
    const subTitleText = document.querySelector(".subtitle");
    const tl = gsap.timeline();
    const subtitle = SplitText.create(subTitleText, {
      type: "lines",
      mask: "lines",
    });
    tl.fromTo(
      title,
      {
        yPercent: 100,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out",
      },
    )
      .fromTo(
        subtitle.lines,
        {
          yPercent: 100,
        },
        {
          duration: 0.3,
          yPercent: 0,
          stagger: {
            each: 0.05,
          },
          ease: "power3.out",
          
        },
      ).fromTo(subTitleText,{
           opacity:0
      },{
       opacity:0.7,
       duration:0.3,
       ease: "power3.out",
          
      } ,"<")
      .fromTo(
        ".fade-in-left",
        {
          delay: 0.2,
          xPercent: -100,
          autoAlpha:0
        },
        {
          xPercent: 0,
          duration: 1,
          ease: "back.out",
          autoAlpha:1
        },
      )
     .fromTo(
        ".fade-in-right",
        {
          xPercent: 100,
          autoAlpha:0
        },
        {
          xPercent: 0,
          duration: 1,
          ease: "back.out",
          autoAlpha:1
        },
        "<",
      )
      .from(
        ".banner",
        {
          autoAlpha: 0,
          duration: 2,
          ease: "power1.inOut",
        },
        "<",
      );
  });
  return (
    <div className="overflow-hidden">
      <div className="flex p-0 w-full flex flex-col lg:flex-row gap-4 md:h-[calc(100vh-146px)] h-[85dvh] md:pt-4 md:px-16 bg-[#F2F0F1]">
        {/* Left side - fixed so it never overflows */}
        <div className="text-side px-[30px] md:p-[5px] pt-[20px]  flex flex-col basis-[60%] justify-center ">
          <h1 className="font-[900] text-[30px] md:text-[40px] leading-tight title opacity-0">
            Find Clothes That <br /> Matches Your Style
          </h1>
          <p className=" mt-3 max-w-[480px] subtitle opacity-0">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="mt-4 fade-in-left opacity-0">
            <LinkButton text="Shop Now" href="/#categories" />
          </div>

          <div className="flex justify-center md:justify-start gap-6 mt-6 flex-wrap fade-in-left opacity-0">
            <div className="flex flex-col gap-1">
              <div className="font-[600] text-[28px] flex">
                {/* @ts-ignore
                <CountUp
                  from={0}
                  to={100}
                  separator=","
                  direction="up"
                  duration={1.9}
                  className="count-up-text"
                //   startWhen={false}
                />
                + */}
                <h1 id="hundred"></h1>+
              </div>
              <p className="opacity-70 text-sm">International Brands</p>
            </div>
            <div className="w-px bg-black/20 self-stretch" /> {/* divider */}
            <div className="flex flex-col gap-1">
              <div className="font-[600] text-[28px] flex">
                <h1 id="two-thousand"></h1>+
              </div>
              <p className="opacity-70 text-sm">High-Quality Products</p>
            </div>
            <div className="w-px bg-black/20 self-stretch hidden md:block" />{" "}
            {/* divider */}
            <div className="flex flex-col gap-1">
              <div className="font-[600] text-[28px] flex">
                <h1 id="thirty-k"></h1>+
              </div>
              <p className="opacity-70 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right side - image fills its container naturally */}
        <div className="image-side basis-[40%] relative flex items-center justify-center fade-in-right opacity-0">
          <Image
            src="/landing/star-removebg-preview.png"
            className="absolute z-[100] lg:top-[50px] top-0 right-0 lg:right-[40px]"
            alt="star"
            width={50}
            height={50}
          />
          <Image
            src="/landing/star-removebg-preview.png"
            className="absolute z-[100] bottom-[0px] lg:bottom-[40px] left-0 lg:left-[-20px]"
            alt="star"
            width={50}
            height={50}
          />
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
      <div className="banner">
        <Banner />
      </div>
    </div>
  );
};

export default Landing;
