
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeFromCart } from '../slice/cartSlice';
import config from '../Khalti/KhaltiConfig'
import KhaltiCheckout from "khalti-checkout-web";

function Cart() {
    let checkout = new KhaltiCheckout(config);
    const cart = useSelector(state => state.product);
    console.log("cart ", cart);
    const dispatch = useDispatch();

    let totalPrice = useMemo(() => {
        return cart?.product?.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }, [cart]);

    const removeCart = (id) => {
        console.log('id ', id)
        dispatch(removeFromCart({ productId: id }));
        console.log("cart products ", cart);
    }
    return (
        <div className='flex flex-col gap-[2rem] items-center justify-center mt-[4rem] h-[60vh]'>
            {
                cart && cart.product.map((product, index) => {
                    return <div className='flex flex-col gap-[1rem]'>
                        <div className='flex gap-[3rem]'>
                            <h1>{product.name}</h1>
                            <img src={product.image} alt="not found" className='h-[5vh] w-[3vw]' />
                            {/* <p>{product.description}</p> */}
                            <p>Price: {product.price}</p>
                            <p>Category: {product.category}</p>
                            <button className='px-[1rem] h-[2rem] py-[0.2rem] text-red-500' onClick={() => removeCart(product.id)}>
                                <Link>remove</Link>
                            </button>
                        </div>
                        <hr className="bg-black border-none h-[2px] w-full" />
                    </div>
                })

            }
            <p>
                Total Price: {cart && totalPrice}
            </p>
            <div>
                <button className='px-[2rem] py-[0.5rem] bg-purple-600 font-bold text-white' onClick={()=> checkout.show({amount: totalPrice*100})}>Checkout</button>
            </div>
        </div>
    )
}


export default Cart   