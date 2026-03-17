import Landing from "@/components/Landing";
import { Product } from "./interfaces/product";
import CardsShow from "@/components/cardsShow";
import BrowseCategory from "@/components/browseCategory";
import Footer from "@/components/footer";
import { getProducts } from "./functions/getProducts";



const Home = async () => {

  const dummy = await getProducts()
  const { clothes, electronics } = dummy

  return (
    <div>
      <Landing />
      <div className="flex flex-col justify-center items-center">

        <CardsShow products={clothes} title="top sold clothes" href = "clothes"/>
        <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={electronics} title="hottest electronics" href = "electronics" />
        {/* <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={furniture} title="Furniture" />
        <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={accessories} title="accessories" /> */}
      </div>
      <div>
        <BrowseCategory />
      </div>
      
    </div>
  );
};

export default Home;