import { getProducts } from "@/app/functions/getProducts";
import { Product } from "@/app/interfaces/product";
import FilterBar from "@/components/filterBar";
import FilterMobile from "@/components/FilterMobile";
import PaginationBar from "@/components/Paginationbar";
import ProductCard from "@/components/productCard";
import ResetFilters from "@/components/ResetFilters";
import SortBar from "@/components/sortBar";
 
type Category = "clothes" | "electronics" | "accessories" | "furniture"; // all valid keys
const Clothes = async ({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{
    page?: string;
    sub?: string;
    price?: string;
    sort?: string;
  }>
}) => {
  const { category } = await params;
  const { page, sub, price, sort } = await searchParams;

  const activeSubs = sub?.split(",") ?? [];

  const currentPage = Number(page) || 1;
  const categoriesGroups = {
    clothes: [
      "mens-shirts",
      "mens-shoes",

      "womens-dresses",
      "womens-shoes",

      "tops"
    ],
    electronics: [
      "smartphones",
      "laptops",
      "tablets",
      "mobile-accessories"
    ],
    furniture: [
      "furniture",
      "home-decoration",
      "kitchen-accessories"
    ],
    accessories: [
      "womens-bags",
      "womens-watches",
      "womens-jewellery",
      "mens-watches",
      "sunglasses"
    ]
  }
  const products = await getProducts();

  // Type assertion to let TS know this is a valid key
  if (!["clothes", "electronics", "accessories", "furniture"].includes(category)) {
    // handle invalid category (404 page, empty array, etc.)
    return <div>Category not found</div>;
  }

  const selectedProducts: Product[] = products[category as Category];
  const selectedSubCategories = categoriesGroups[category as Category]
  console.log('subcategories', selectedSubCategories);
  console.log(selectedProducts);
  // let filteredProducts = selectedProducts;

  // if (activeSubs.length > 0) {
  //   filteredProducts = selectedProducts.filter((p) =>
  //     activeSubs.includes(p.category)
  //   );
  // }
  let filteredProducts = selectedProducts;

  if (activeSubs.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      activeSubs.includes(p.category)
    );
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);

    filteredProducts = filteredProducts.filter(
      p => p.price >= min && p.price <= max
    );
  }
  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (sort === "title-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.title.localeCompare(b.title)
    );
  }
  // console.log(window)
  const ITEMS_PER_PAGE = 6;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE
  );

  return (
    <div className="pt-10 w-full px-10 mx-auto">
      <div className="flex justify-center w-full gap-10">
        <div className="filteration-bar basis-[20%] border rounded-lg px-6 py-10 h-screen shadow-lg lg:block hidden">
          <FilterBar subcategories={selectedSubCategories} />
        </div>
        <div className="products">
          <div className="flex justify-between items-center">
            <div className="block lg:hidden">

              <FilterMobile subcategories={selectedSubCategories} />
            </div>
            

            <SortBar />
            {/* <div className="block lg:hidden">
              <TuneIcon />
            </div> */}
          </div>
          <h1 className="uppercase font-[800] text-[20px] mt-10">{category}</h1>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-4 mt-4 ">
            {paginatedProducts.map((p) => (
              <div key={p.id} className="product">

              <ProductCard  product={p} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="">
              No Products Match The Filters Please Change Filters Or Clear Them
              <ResetFilters />
            </div>
          )}
          {filteredProducts.length > ITEMS_PER_PAGE && (
            <PaginationBar totalPages={totalPages} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Clothes;