
import React, { useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    removeFromCart,
    removeItemFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart
} from '../slice/cartSlice';
import { toast } from 'react-toastify';

function Cart() {
    const cart = useSelector(state => state.product);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [loadingItems, setLoadingItems] = useState(new Set());
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const productsInCart = cart?.product || [];

    const subtotal = useMemo(() => {
        return productsInCart.reduce((total, item) => {
            return total + (item.price || 0) * item.quantity;
        }, 0);
    }, [productsInCart]);

    const discount = appliedCoupon ? subtotal * 0.1 : 0; 
    const shipping = subtotal > 100 ? 0 : 15; 
    const tax = subtotal * 0.08; 
    const totalPrice = subtotal - discount + shipping + tax;

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=200&fit=crop&crop=center`;
        e.target.alt = "Product Image";
    };

    const setItemLoading = (productId, isLoading) => {
        setLoadingItems(prev => {
            const newSet = new Set(prev);
            if (isLoading) {
                newSet.add(productId);
            } else {
                newSet.delete(productId);
            }
            return newSet;
        });
    };

    const handleRemoveItem = async (productId) => {
        setItemLoading(productId, true);
        
        if (!user || !user._id) {
            toast.error("User not logged in. Cannot remove item from backend.");
            dispatch(removeItemFromCart({ productId }));
            setItemLoading(productId, false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/cart/remove-cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id,
                    productId: productId,
                }),
            });

            if (response.ok) {
                dispatch(removeItemFromCart({ productId }));
                const data = await response.json();
                toast.success("🗑️ Item removed from cart", {
                    style: {
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                    }
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to remove item from the backend cart.');
            }
        } catch (error) {
            console.error('Error removing from backend cart:', error);
            toast.error(`Could not remove item: ${error.message}`);
        } finally {
            setItemLoading(productId, false);
        }
    };

    const handleClearCart = async () => {
        if (!user || !user._id) {
            toast.error("User not logged in. Cannot clear cart from backend.");
            dispatch(clearCart());
            setShowClearConfirm(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/cart/clear-cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user._id }),
            });

            if (response.ok) {
                dispatch(clearCart());
                toast.success("🧹 Cart cleared successfully");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to clear cart from the backend.');
            }
        } catch (error) {
            console.error('Error clearing backend cart:', error);
            toast.error(`Could not clear cart: ${error.message}`);
        } finally {
            setShowClearConfirm(false);
        }
    };

    const handleIncrementQuantity = async (productId) => {
        setItemLoading(productId, true);
        dispatch(incrementQuantity({ productId }));

        if (!user || !user._id) {
            toast.warn("Quantity updated locally. Login to sync with backend.");
            setItemLoading(productId, false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/cart/update-quantity', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, productId, type: 'increment' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update quantity on backend.');
            }
        } catch (error) {
            console.error('Error updating quantity on backend:', error);
            toast.error(`Failed to update quantity: ${error.message}`);
            dispatch(decrementQuantity({ productId }));
        } finally {
            setItemLoading(productId, false);
        }
    };

    const handleDecrementQuantity = async (productId, currentQuantity) => {
        setItemLoading(productId, true);
        
        if (currentQuantity <= 1) {
            await handleRemoveItem(productId);
            return;
        }

        dispatch(decrementQuantity({ productId }));

        if (!user || !user._id) {
            toast.warn("Quantity updated locally. Login to sync with backend.");
            setItemLoading(productId, false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/cart/update-quantity', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user._id, productId, type: 'decrement' }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update quantity on backend.');
            }
        } catch (error) {
            console.error('Error updating quantity on backend:', error);
            toast.error(`Failed to update quantity: ${error.message}`);
            dispatch(incrementQuantity({ productId }));
        } finally {
            setItemLoading(productId, false);
        }
    };

    const handleApplyCoupon = () => {
        if (couponCode.toLowerCase() === 'welcome10') {
            setAppliedCoupon({ code: couponCode, discount: 0.1 });
            toast.success("🎉 Coupon applied! 10% off your order");
            setCouponCode('');
        } else {
            toast.error("Invalid coupon code");
        }
    };

    const handleCheckout = async () => {
        if (totalPrice <= 0) {
            toast.warn("Your cart is empty or the total is zero.");
            return;
        }

        if (!user || !user._id) {
            toast.error("Please log in to proceed to checkout.");
            return;
        }

        setIsCheckingOut(true);

        const paymentDetails = {
            orderId: `ORDER-${Date.now()}-${user._id}`,
            orderName: 'E-commerce Cart Checkout',
            amount: Math.round(totalPrice) * 100,
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
                toast.error(`Error: ${data.error || 'Could not initiate payment.'}`);
            }
        } catch (error) {
            console.error('Checkout failed:', error);
            toast.error('Checkout failed. Please check the console for details.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    const CartItem = ({ product }) => (
        <div className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 relative overflow-hidden">
            {loadingItems.has(product.id) && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-3xl">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            )}
            
            <div className="flex items-start gap-6">
                <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-lg transition-shadow duration-300">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={handleImageError}
                        />
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 truncate pr-4 group-hover:text-purple-600 transition-colors duration-300">
                            {product.name}
                        </h3>
                        <button
                            onClick={() => handleRemoveItem(product.id)}
                            disabled={loadingItems.has(product.id)}
                            className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 disabled:opacity-50"
                            title="Remove item"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                            {product.category}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-2xl p-1">
                            <button
                                onClick={() => handleDecrementQuantity(product.id, product.quantity)}
                                disabled={loadingItems.has(product.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-red-50 hover:text-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                            </button>
                            <span className="mx-4 font-semibold text-gray-900 min-w-[2rem] text-center">
                                {product.quantity}
                            </span>
                            <button
                                onClick={() => handleIncrementQuantity(product.id)}
                                disabled={loadingItems.has(product.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-green-50 hover:text-green-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-right">
                            <div className="text-xl font-bold text-gray-900">
                                ${(product.price * product.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                                ${product.price.toFixed(2)} each
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const EmptyCart = () => (
        <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Continue Shopping
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-extrabold mb-2">Shopping Cart</h1>
                            <p className="text-purple-100">
                                {productsInCart.length} {productsInCart.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                                <div className="text-2xl font-bold">${totalPrice.toFixed(2)}</div>
                                <div className="text-purple-200 text-sm">Total Amount</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {productsInCart.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                        <div className="lg:col-span-2 space-y-6 mb-8 lg:mb-0">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
                                <button
                                    onClick={() => setShowClearConfirm(true)}
                                    className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Clear Cart
                                </button>
                            </div>
                            
                            {productsInCart.map((product) => (
                                <CartItem key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 sticky top-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>

                                {!appliedCoupon && (
                                    <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Have a coupon code?
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter code (try: WELCOME10)"
                                                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors duration-300 font-medium"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {appliedCoupon && (
                                    <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-green-700 font-semibold">
                                                    {appliedCoupon.code} Applied
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => setAppliedCoupon(null)}
                                                className="text-green-600 hover:text-green-700 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount (10%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                                    </div>
                                    
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (8%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    
                                    {shipping === 0 && (
                                        <div className="text-sm text-green-600 font-medium">
                                            🎉 You saved $15 on shipping!
                                        </div>
                                    )}
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className={`
                                        w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform
                                        flex items-center justify-center gap-3
                                        ${isCheckingOut 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-lg active:scale-95'
                                        }
                                        text-white shadow-lg
                                    `}
                                >
                                    {isCheckingOut ? (
                                        <>
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Proceed to Checkout
                                        </>
                                    )}
                                </button>

                                <div className="mt-6 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Secure SSL encrypted checkout
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>

            {showClearConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <div className="text-center">
                            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Clear Cart?</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to remove all items from your cart? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-2xl font-medium hover:bg-gray-300 transition-colors duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleClearCart}
                                    className="flex-1 py-3 px-4 bg-red-600 text-white rounded-2xl font-medium hover:bg-red-700 transition-colors duration-300"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;