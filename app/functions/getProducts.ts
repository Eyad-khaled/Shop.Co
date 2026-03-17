
import { Product } from "../interfaces/product"

export const getProducts = async () => {

    const res = await fetch(`https://dummyjson.com/products?limit=200`, { cache: "force-cache" })
    const data = await res.json()

    const products: Product[] = data.products

    // CATEGORY GROUPING
    const clothingCategories = [
        "mens-shirts",
        "mens-shoes",

        "womens-dresses",
        "womens-shoes",

        "tops"
    ]

    const accessoriesCategories = [
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "mens-watches",
        "womens-watches",
    ]

    const electronicsCategories = [
        "smartphones",
        "laptops",
        "tablets",
        "mobile-accessories"
    ]

    const homeCategories = [
        "furniture",
        "home-decoration",
        "kitchen-accessories"
    ]

    const clothes = products.filter(p => clothingCategories.includes(p.category))
    const accessories = products.filter(p => accessoriesCategories.includes(p.category))
    const electronics = products.filter(p => electronicsCategories.includes(p.category))
    const furniture = products.filter(p => homeCategories.includes(p.category))

    return { clothes, accessories, electronics, furniture }

}
export const getAllProducts = async () => {

    const products = await (await fetch(`https://dummyjson.com/products/`, { cache: 'force-cache' })).json()
    return products
}
export  const getProductById = async (id: string) => {
    const res = await fetch(
        `https://dummyjson.com/products/${id}`,
        { cache: "force-cache" }
    )

    const product = await res.json()
    return product
}