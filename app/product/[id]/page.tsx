import { getProductById } from "@/app/functions/getProducts";
import ProductDetails from "@/components/ProductDetails";


const Product = async ({ params }: { params: Promise<{ id: string }>; }) => {
    const { id } = await params;
    console.log(id)
    const product = await getProductById(id)
    console.log('product', product)
    return (
        <div>
            <ProductDetails product={product} />
        </div>
    );
};

export default Product;