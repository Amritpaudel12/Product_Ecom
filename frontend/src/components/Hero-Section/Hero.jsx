
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div>
            <div className='h-[70vh] flex justify-around items-center'>
                <div className='w-[30vw] flex flex-col items-center gap-[1rem]'>
                    <h1 className='font-bold text-4xl font-sans text-purple-800'>Product Ecom</h1>
                    <p className='text-justify'>Discover fashion like never before! Our eCommerce platform offers a stunning collection of clothing across multiple categories—trendy streetwear, elegant formalwear, cozy casuals, and more. Find the perfect outfit with ease, enjoy seamless shopping, and experience unbeatable style. Shop now and redefine your wardrobe with the latest fashion trends!</p>
                    <div className='flex gap-[1.5rem]'>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>Explore Now</button>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>Learn More</button>
                    </div>
                </div>
                <img src="images/hero.jpg" alt="not found" />
            </div>
            <div>
                <h1 className='text-[2rem] text-center font-bold text-purple-800'>Categories</h1>
                <div className='grid grid-cols-[25vw_25vw_25vw] justify-center gap-[2rem]'>
                    <div className='h-[60vh]'>
                        <h1 className='text-[1.5rem] font-semibold font-sans text-center'>Pants</h1>
                        <img src="images/Pant.jpeg" alt="not found" className='h-[35vh] w-[25vw]' />
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, debitis facere. Obcaecati ratione eos autem aliquid voluptatem aliquam repellat et!</p>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>
                            <Link to='/categories/Pants'>
                                Explore Now
                            </Link>
                        </button>
                    </div>
                    <div className='h-[60vh]'>
                        <h1 className='text-[1.5rem] font-semibold font-sans text-center'>Shirts</h1>
                        <img src="images/Shirt.jpeg" alt="not found"  />
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, dolores adipisci illum dignissimos facilis impedit assumenda molestias id accusamus rerum!</p>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>
                            <Link to='/categories/Shirt'>
                                Explore Now
                            </Link>
                        </button>
                    </div>
                    <div>
                        <h1 className='text-[1.5rem] font-semibold font-sans text-center'>Sweaters</h1>
                        <img src="images/Sweater.jpeg" alt="" />
                        <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugit quasi dolorem magni consectetur dolore vitae incidunt quibusdam cumque non.</p>
                        <button className='px-[1.5rem] py-[0.5rem] bg-purple-600 font-bold text-white'>
                            <Link to='/categories/Sweater'>
                                Explore Now
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero