import React, { useMemo } from 'react'
import { useGetProductsQuery } from '../services/product/productApi'
import { Link } from 'react-router-dom';
import { addToCart } from '../slice/cartSlice';
import { useDispatch } from 'react-redux';


function Product() {
    const { data, error, isLoading } = useGetProductsQuery();
    console.log("products: ", data);
    const dispatch = useDispatch();


    if (error) {
        return <div>
            Error: <span>{error}</span>
        </div>
    }

    if (isLoading) {
        return <div>
            Loading.....
        </div>
    }

    const handleAddToCart = (product) => {
        console.log("Adding product:", product);
        dispatch(addToCart(product));
    };


    const Pants = data && data?.data.filter((cloth, ind) => cloth.category === "Pants")

    const Sweaters = data && data?.data.filter((cloth, ind) => cloth.category === "Sweater")

    const Shirts = data && data?.data.filter((cloth, ind) => cloth.category === "Shirt")

    return (
        <div className='flex flex-col gap-[4rem]'>
            <div className='flex flex-col gap-[2rem]'>
                <h1 className="text-[3rem] font-bold text-center text-purple-700">Pants</h1>
                <div className='grid grid-cols-[25vw_25vw_25vw] justify-center gap-[2rem]'>
                    {
                        Pants && Pants.map((pant, ind) => {
                            return <div className='flex flex-col items-center gap-[0.5rem]'>
                                <h1 className='text-[1.5rem] font-semibold font-sans'>{pant.name}</h1>
                                <img src={pant.image} alt="not found" className='h-[40vh] w-[25vw]' />
                                <p className='text-justify h-[20vh]'>{(pant.description).slice(0, 200)}....</p>
                                <p>Price: {pant.price}</p>
                                <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white' onClick={() => handleAddToCart({
                                    id: pant._id, name: pant.name, image: pant.image, description: pant.description, price: pant.price,
                                    category: pant.category
                                })}>
                                    <Link>Add To Cart</Link>
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-[2rem]'>
                <h1 className="text-[3rem] font-bold text-center text-purple-700">Sweaters</h1>
                <div className='grid grid-cols-[25vw_25vw_25vw] justify-center gap-[2rem]'>
                    {
                        Sweaters && Sweaters.map((pant, ind) => {
                            return <div className='flex flex-col items-center gap-[0.5rem]'>
                                <h1 className='text-[1.5rem] font-semibold font-sans'>{pant.name}</h1>
                                <img src={pant.image} alt="not found" className='h-[40vh] w-[25vw]'/>
                                <p className='text-justify h-[20vh]'>{(pant.description).slice(0, 200)}....</p>
                                <p>{pant.price}</p>
                                <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white' onClick={() => handleAddToCart({
                                    id: pant._id, name: pant.name, image: pant.image, description: pant.description, price: pant.price,
                                    category: pant.category
                                })}>
                                    <Link>Add To Cart</Link>
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='flex flex-col gap-[2rem]'>
                <h1 className="text-[3rem] font-bold text-center text-purple-700">Shirts</h1>
                <div className='grid grid-cols-[25vw_25vw_25vw] justify-center gap-[2rem]'>
                    {
                        Shirts && Shirts.map((pant, ind) => {
                            return <div className='flex flex-col items-center gap-[0.5rem]'>
                                <h1 className='text-[1.5rem] font-semibold font-sans'>{pant.name}</h1>
                                <img src={pant.image} alt="not found" className='h-[40vh] w-[25vw]'/>
                                <p className='text-justify h-[20vh]'>{(pant.description).slice(0, 200)}....</p>
                                <p>{pant.price}</p>
                                <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white' onClick={() => handleAddToCart({
                                    id: pant._id, name: pant.name, image: pant.image, description: pant.description, price: pant.price,
                                    category: pant.category
                                })}>
                                    <Link>Add To Cart</Link>
                                </button>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Product