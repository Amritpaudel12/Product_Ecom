import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../services/product/productApi';

function Categories() {
    const { Category } = useParams();
    console.log("category ", Category);
    const { data, error, isLoading } = useGetProductsQuery();
    console.log("products ", data);

    let [Product, setProduct] = useState([]);
    let [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(()=>{
        // let Products = useMemo(
        //     () => {
        //         return data?.data.filter((product, ind) => product.category === Category );
        //     }, [data]
        // )


        let Products = data?.data.filter((product, ind) => product.category === Category );

        setProduct(Products);
        setCategoryProducts(Products);
    }, [data]);
    
    console.log("Product ", Product);

    const handleColorChange = (e) => {
        const color = e.target.value;
        console.log(color);
        let colorProducts = categoryProducts && categoryProducts.filter((product, ind) => product.color === color);
        setProduct(colorProducts);
    }

    const displayAll = () => {
        setProduct(categoryProducts);
    }

  return (
    <div>
        <h1>{Category}</h1>
        { Category === 'Shirt' &&
        <div className='flex gap-[0.5rem]'>
            <button onClick={displayAll}>All</button>
            <button value="Black" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-black' onClick={handleColorChange}></button>
            <button value="Blue" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-blue-700' onClick={handleColorChange}></button> 
            <button value="White" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-gray-100' onClick={handleColorChange}></button>
        </div>
        }
        { Category === 'Pants' &&
        <div className='flex gap-[0.5rem]'>
            <button onClick={displayAll}>All</button>
            <button value="Black" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-black' onClick={handleColorChange}></button>
            <button value="Blue" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-blue-700' onClick={handleColorChange}></button> 
            <button value="Orange" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-orange-500' onClick={handleColorChange}></button>
            <button value="Pink" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-pink-500' onClick={handleColorChange}></button>
        </div>
        }
        { Category === 'Sweater' &&
        <div className='flex gap-[0.5rem]'>
            <button onClick={displayAll}>All</button>
            <button value="Black" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-black' onClick={handleColorChange}></button>
            <button value="Blue" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-blue-700' onClick={handleColorChange}></button> 
            <button value="White" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-gray-100' onClick={handleColorChange}></button>
            <button value="Red" className='h-[1.5rem] w-[1.5rem] rounded-2xl bg-red-600' onClick={handleColorChange}></button>
        </div>
        }
        <div className='grid grid-cols-[25vw_25vw_25vw] justify-center gap-[3rem]'>
            {
                Product && Product.map((product, index)=>{
                    return <div className='flex flex-col items-center gap-[0.5rem]'>
                        <h1 className='text-[1.5rem] font-semibold font-sans'>{ product.name }</h1>
                        <img src={ product.image } alt="not found" className='h-[40vh] w-[25vw]' />
                        <p>{(product.description).slice(0,200)}...</p>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>
                            <Link to={`/single-products/${ product._id }`}>Explore</Link>
                        </button>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Categories