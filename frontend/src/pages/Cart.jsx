import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeFromCart } from '../slice/cartSlice';
import config from '../Khalti/KhaltiConfig'
import KhaltiCheckout from "khalti-checkout-web";

function Cart() {
    let checkout = new KhaltiCheckout(config);
    const cart = useSelector(state => state.product);
    console.log("cart details ", cart);
    const dispatch = useDispatch();

    let totalPrice = useMemo(() => {
        return cart?.product?.reduce((total, item) => {
            return total + (item.price || 0);
        }, 0);
    }, [cart]);

    const removeCart = (id) => {
        dispatch(removeFromCart({ productId: id }));
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Shopping Cart</h2>
                {
                    cart && cart.product.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {
                                cart.product.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt="Product" className="h-20 w-20 object-cover rounded" />
                                            <div>
                                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                                <p className="text-sm text-gray-600">Category: {product.category}</p>
                                                <p className="text-sm text-gray-800 font-medium">Price: Rs. {product.price}</p>
                                            </div>
                                        </div>
                                        <button 
                                            className="text-red-600 hover:text-red-800 font-medium"
                                            onClick={() => removeCart(product.id)}
                                        >
                                            <Link>Remove</Link>
                                        </button>
                                    </div>
                                ))
                            }

                            <div className="flex items-center justify-between mt-6 text-xl font-bold">
                                <span>Total:</span>
                                <span>Rs. {Math.round(totalPrice)}</span>
                            </div>

                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white px-6 py-3 rounded-md transition"
                                    onClick={() => checkout.show({ amount: totalPrice * 100 })}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
                    )
                }
            </div>
        </div>
    )
}

export default Cart
