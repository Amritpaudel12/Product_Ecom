import React from 'react'

function Footer() {
  return (
    <div className='h-[10vh] bg-gray-800 flex justify-between text-white items-center px-[1rem] mt-[4rem]'>
        <div className='flex gap-[2rem]'>
            <p>Product Ecom
                <span className='ml-[1rem]'>&copy;</span>
            </p>
            <span>productecom@gmail.com</span> 
        </div>
        <div>
            facebook, instagram
        </div>
    </div>
  )
}

export default Footer