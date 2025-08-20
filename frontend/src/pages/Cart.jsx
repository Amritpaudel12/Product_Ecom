
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../slice/cartSlice';

function Cart() {
    const cart = useSelector(state => state.product);
    const dispatch = useDispatch();
    const groupedProducts = useMemo(() => {
        const map = new Map();
        cart?.product?.forEach(item => {
            if (map.has(item.id)) {
                map.get(item.id).quantity += 1;
            } else {
                map.set(item.id, { ...item, quantity: 1 });
            }
        });
        return Array.from(map.values());
    }, [cart]);
    const totalPrice = useMemo(() => {
        return groupedProducts.reduce((total, item) => {
            return total + (item.price || 0) * item.quantity;
        }, 0);
    }, [groupedProducts]);

    const removeCart = (id) => {
        dispatch(removeFromCart({ productId: id }));
    };
    const handleCheckout = async () => {
        if (totalPrice <= 0) {
            alert("Your cart is empty or the total is zero.");
            return;
        }

        const paymentDetails = {
            orderId: `ORDER-${Date.now()}`, 
            orderName: 'E-commerce Cart Checkout',
            amount: Math.round(totalPrice) * 100 
        };

        try {
            const response = await fetch('http://localhost:3000/api/khalti/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentDetails)
            });

            const data = await response.json();

            if (data.success && data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                alert(`Error: ${data.error || 'Could not initiate payment.'}`);
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            alert('Checkout failed. Please check the console for details.');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-2">Shopping Cart</h2>
                {
                    groupedProducts.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {
                                groupedProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt="Product" className="h-20 w-20 object-cover rounded" />
                                            <div>
                                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                                <p className="text-sm text-gray-600">Category: {product.category}</p>
                                                <p className="text-sm text-gray-800 font-medium">Price: Rs. {product.price}</p>
                                                <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
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
                                    onClick={handleCheckout} 
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
    );
}

export default Cart;