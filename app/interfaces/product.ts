export interface category {
    creationAt
    :
    string
    id
    :
    number
    image
    :
    string
    name
    :
    string
    slug
    :
    string
    updatedAt
    :
    string;

}
export interface review {
    comment:string
    date: string
    rating:number
    reviewerEmail?:string
    reviewerName?:string
}
export interface Product {
    id: number
    title: string
    price: number
    category: string
    images: string[]
    thumbnail: string;
    rating: number;
    discountPercentage: number;
    description:string;
    reviews: review[];
    brand:string
}
