"use client";
import { Product } from "@/app/interfaces/product";
import CardsShow from "./cardsShow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export interface product {
  title: string;
  href: string;
  products: Product[];
}
interface CardsProps {
  products: product[];
}
function Cards(products: CardsProps) {
  useGSAP(() => {
    const container = document.getElementById("container");
    const cards = gsap.utils.toArray(".cards");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top ",
        end: "+=2000",
        scrub: true,
        pin: true,
      },
    });
    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        {
          yPercent: 200,
        },
        {
          yPercent: 10 * i,
        },
      );
    });
  });
  return (
    <div
      id="container"
      className="flex flex-col justify-center items-center bg-white relative min-h-screen pb-10"
    >
      {products.products.map((product: product, i) => {
        return (
          <div
            className="cards absolute top-0 left-0 w-full flex justify-center items-center"
            key={i}
          >
            <CardsShow
              products={product.products}
              title={product.title}
              href={product.href}
            />
          </div>
        );
      })}
      {/* <CardsShow products={clothes} title="top sold clothes" href="clothes" />
      <div className="h-px w-full bg-black/20 self-stretch mt-20" />
      <CardsShow
        products={electronics}
        title="hottest electronics"
        href="electronics"
      />
      <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={furniture} title="Furniture" />
        <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={accessories} title="accessories" /> */}
    </div>
  );
}

export default Cards;
