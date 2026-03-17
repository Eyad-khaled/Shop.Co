"use client"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/app/store/store"
import { addToCart } from "@/app/features/cartSlice"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from "@/app/interfaces/product";
import Image from "next/image";
import { useState } from "react";
import StarRating from "./starsRating";
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
interface ProductDetailsProps {
    product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const cart = useSelector((state: RootState) => state.CartReducer.items)
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setquantity] = useState(1)
    const [isVisible, setIsVisible] = useState(true)
    const [IsSuccesful, setIsSuccesful] = useState(false)

    const handleImageChange = (index: number) => {
        setIsVisible(false) // fade out
        setTimeout(() => {
            setCurrentImage(index)
            setIsVisible(true) // fade in
        }, 200) // must match transition duration
    }
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }
    const handleAddToCart = () => {
        try {
            setIsSuccesful(true)
            dispatch(addToCart({ product, quantity }))
        } catch (err) {
            console.log(err);

        } finally {
            setquantity(1)
            setTimeout(()=>{
                setIsSuccesful(false)
            },3000)
        }
    }
    return (
        <div className="w-[90%] mx-auto">
            <div className={`absolute bottom-6 left-4 bg-green-500 text-white py-2 px-4 rounded-[30px] flex justify-between items-center gap-4  transition-all transition ease-in-out duration-[1s] ${IsSuccesful ? 'opacity-1' : 'opacity-0'}`}>
                <h1>Added Succesfully To Cart</h1>
                <CheckIcon />
            </div>

            <div className="flex justify-center  lg:gap-4 mt-14 lg:flex-row flex-col gap-8">
                <div className="images flex flex-col-reverse lg:flex-row justify-center items-center gap-4">
                    {
                        product.images.length > 1 && (
                            <div className="three-imgs flex justify-center items-center lg:flex-col flex-row gap-2">
                                {product.images.map((image: string, index: number) => (
                                    <div key={index} className="bg-[#F0EEED] rounded-lg cursor-pointer" onClick={() => handleImageChange(index)}>
                                        <Image src={image} height={100} width={100} alt={`${product.title} image : ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )
                    }

                    <div
                        className="current-img  bg-[#F0EEED] rounded-lg"

                    >
                        <Image style={{ opacity: isVisible ? 1 : 0 }} className="h-full w-auto transition-opacity duration-300 ease-in-out" src={product.images[currentImage]} height={200} width={200} alt="Showing Image" />
                    </div>
                </div>
                <div className="details flex flex-col justify-between basis-[60%]">
                    <h1 className="text-[30px] font-[800] ">{product.title}</h1>

                    <div className="rating py-4">
                        <StarRating rating={product.rating} />
                    </div>
                    <div className="price flex items-center gap-8">
                        <h1 className="current-price text-[20px] font-[700]">${(product.price * ((100 - product.discountPercentage) / 100)).toFixed(2)}</h1>
                        <h1 className="current-price text-[20px] font-[700] opacity-40 line-through">${(product.price).toFixed(2)}</h1>
                        <h1 className="current-price text-[16px] font-[500] text-[#FF3333] bg-lightRed px-2 rounded-[30px]">- {Math.ceil(product.discountPercentage)}%</h1>
                    </div>
                    <p className="py-4 text-lg font-semibold"> <span className="opacity-60">Brand</span> : {product.brand}</p>
                    <div className="description pt-4">
                        <p className="opacity-60">{product.description}</p>
                    </div>
                    
                    <div className="add-to-cart flex pt-16 items-center gap-4">
                        <div className="quantity flex justify-between items-center basis-1/3 px-4 bg-[#F0EEED] rounded-[50px] py-4">
                            <div className="cursor-pointer" onClick={() => quantity > 1 ? setquantity(quantity - 1) : null}>

                                <RemoveIcon />
                            </div>
                            <div className="number font-semibold">{quantity}</div>
                            <div className="cursor-pointer" onClick={() => setquantity(quantity + 1)}>

                                <AddIcon />
                            </div>
                        </div>
                        <div onClick={handleAddToCart} className="add-to-cart cursor-pointer flex-grow text-center bg-black text-white rounded-[50px] py-4">
                            <button>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px bg-black/10  self-stretch my-10 mx-auto" />
            <div className="reviews">
                <div className=" flex justify-between items-center">

                    <h1 className="font-semibold text-lg">All Reviews ({product.reviews.length})</h1>

                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 pt-8">
                    {product.reviews.map((review, index) => (
                        <div className="border rounded-lg p-6" key={index}>
                            <div className="flex justify-between items-center ">
                                <StarRating rating={review.rating} />
                                <MoreHorizIcon className="opacity-50 cursor-pointer" />
                            </div>
                            <div className="py-4 flex items-center gap-2">
                                <h1 className="text-lg font-bold">{review.reviewerName}</h1>
                                <VerifiedIcon color="primary" />
                            </div>
                            <p className="opacity-70 pb-4">"{review.comment}"</p>
                            <p className="opacity-70 font-semibold">Posted On {formatDate(review.date)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;