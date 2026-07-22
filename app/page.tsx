import Landing from "@/components/Landing";
// import { Product } from "./interfaces/product";
// import CardsShow from "@/components/cardsShow";
import BrowseCategory from "@/components/browseCategory";
// import Footer from "@/components/footer";
import { getProducts } from "./functions/getProducts";
import Cards, { product } from "@/components/Cards";



const Home = async () => {
  const dummy = await getProducts()
  const { clothes, electronics , furniture , accessories} = dummy
  const cardsProducts : product[] = [{title: 'top sold clothes ' , href : "clothes" , products: clothes}, {title: 'hottest electronics ' , href : "electronics", products: electronics , } , {title: 'Best Furniture ' , href : "furniture" , products: furniture} ,  {title: 'Most Loved accessories ' , href : "accessories" , products: accessories}]
  return (
    <div className=" ">
      <Landing />
      <Cards products= {cardsProducts}/>
      <div className="spacer h-[0] lg:h-[30vh] w-full bg-white"></div>
      {/* <div className="flex flex-col justify-center items-center bg-white">
        <CardsShow products={clothes} title="top sold clothes" href = "clothes"/>
        <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={electronics} title="hottest electronics" href = "electronics" /> */}
        {/* <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={furniture} title="Furniture" />
        <div className="h-px w-full bg-black/20 self-stretch mt-20" />
        <CardsShow products={accessories} title="accessories" /> */}
      {/* </div> */}
      <div>
        <BrowseCategory />
      </div>
        <div className="spacer h-screen w-full bg-white"></div>
        <div className="spacer h-screen w-full bg-white"></div>
        <div className="spacer h-screen w-full bg-white"></div>
        <div className="spacer h-[30vh] w-full bg-white"></div>
      
    </div>
  );
};

export default Home;