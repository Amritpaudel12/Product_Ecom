
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetSpecificProductQuery } from '../services/product/productApi';
import { addToCart } from '../slice/cartSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function SingleProducts() {
    const { id } = useParams();
    console.log("product id ", id);

    const dispatch = useDispatch();

    const { data, error, isLoading } = useGetSpecificProductQuery(id);
    console.log("data ", data);
    const product = data?.data;

    const notify = () => toast("Product Added To Cart Successfully!");

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        notify();
    }

    return (
        <div className='flex justify-center'>
            {
                data && <div className='w-[40vw] mt-[2rem] flex flex-col gap-[0.5rem]'>
                    <h1>{product.name}</h1>
                    <img src={product.image} alt="not found" className='h-[40vh] w-[25vw]' />
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Category: {product.category}</p>
                    <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white' onClick={() => handleAddToCart({
                        id:product._id, name: product.name, image: product.image, description: product.description,price: product.price,
                        category: product.category
                    })}>
                        <Link>Add To Cart</Link>
                    </button>
                </div>
            }
        </div>
    )
}

export default SingleProducts