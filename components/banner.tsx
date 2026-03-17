import Image from "next/image";
import CurvedLoop from './CurvedLoop';

interface Brand {
    name: string;
    logo: string
}
const Banner = () => {
    const brands: Brand[] = [{
        name: "Zara",
        logo: "/brands/zara-white.png"
    },
    {
        name: "versace",
        logo: "/brands/versace-white-text.png"
    },
    {
        name: "gucci",
        logo: "/brands/gucci-logo.png"
    },
    {
        name: "prada",
        logo: "/brands/prada-white.png"
    },
    {
        name: 'calvin klien',
        logo: '/brands/calvin-white.png'
    }
    ]
    return (
        <div className=" bg-[#F2F0F1] animate-[opacity_1s_ease-in-out_forwards]">
            <CurvedLoop
                marqueeText="Zara  |  Versace  |  Gucci  |  Prada  |  Calvin Klein  |"
                speed={1}
                curveAmount={0}
                direction="left"
                interactive = {false}
                className=""
            />
            {/* <ul className="flex justify-around flex-wrap items-center px-4 py-[20px]  gap-x-4 gap-y-2 bg-black w-full text-white animate-[slide-in-bottom_0.8s_ease-in-out_forwards]">
                {brands.map((brand: Brand) => (
                    <li key={brand.name} className="min-w-[100px]">
                        <Image src={brand.logo} className={brand.name === "gucci" ? `scale-150` : ``} width={brand.name === "versace" ? 100 : 60} height={brand.name === "versace" ? 100 : 60} alt={brand.name}></Image>

                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Banner;