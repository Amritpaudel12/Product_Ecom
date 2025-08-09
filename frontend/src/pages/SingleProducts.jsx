import React, { useState } from 'react'
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ShoppingCart, ArrowLeft, Loader } from "lucide-react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetSpecificProductQuery } from '../services/product/productApi';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart } from '../slice/cartSlice';

function SingleProducts() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { data, error, isLoading } = useGetSpecificProductQuery(id);
    const product = data?.data;

    const notify = () => toast.success("Product Added To Cart Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
        notify();
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">❌</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
                    <p className="text-gray-600 mb-4">Sorry, we couldn't load this product.</p>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {data && (
                <>
                    {/* Breadcrumb Navigation */}
                    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
                        <div className="max-w-7xl mx-auto px-6 py-4">
                            <div className="flex items-center text-sm text-gray-600 font-medium">
                                <span className="hover:text-blue-600 cursor-pointer transition-colors">
                                    Home
                                </span>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="hover:text-blue-600 cursor-pointer transition-colors">
                                    {product.category}
                                </span>
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-900 truncate max-w-xs">{product.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                            {/* Product Image Section */}
                            <div className="space-y-6">
                                <div className="relative group">
                                    <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Image Loading State */}
                                        {!imageLoaded && (
                                            <div className="relative z-10 w-full h-96 bg-gray-100 rounded-2xl animate-pulse flex items-center justify-center">
                                                <Loader className="w-8 h-8 text-gray-400 animate-spin" />
                                            </div>
                                        )}

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            onLoad={() => setImageLoaded(true)}
                                            className={`relative z-10 w-full h-96 object-contain transform group-hover:scale-105 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                                                }`}
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                                setImageLoaded(true);
                                            }}
                                        />

                                        {/* Action Buttons */}
                                        <div className="absolute top-6 right-6 flex flex-col space-y-3">
                                            <button
                                                onClick={() => setIsWishlisted(!isWishlisted)}
                                                className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/heart"
                                            >
                                                <Heart className={`w-5 h-5 transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 group-hover/heart:text-red-500'
                                                    }`} />
                                            </button>
                                            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                                                <Share2 className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300">
                                        <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <p className="text-sm font-semibold text-gray-800">Free Shipping</p>
                                        <p className="text-xs text-gray-600">On orders over $50</p>
                                    </div>
                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300">
                                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-semibold text-gray-800">Secure Payment</p>
                                        <p className="text-xs text-gray-600">100% Protected</p>
                                    </div>
                                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 text-center border border-gray-200/50 hover:bg-white/90 transition-all duration-300">
                                        <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                        <p className="text-sm font-semibold text-gray-800">Easy Returns</p>
                                        <p className="text-xs text-gray-600">30-day policy</p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Information Section */}
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="space-y-4">
                                    <div className="inline-block">
                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                                        {product.name}
                                    </h1>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <span className="text-gray-600 font-medium">(4.8) • 1,247 reviews</span>
                                    </div>
                                </div>

                                {/* Price Section */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border border-blue-100">
                                    <div className="flex items-baseline space-x-4">
                                        <span className="text-4xl font-bold text-gray-900">
                                            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                                        </span>
                                        <span className="px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full">
                                            Best Price
                                        </span>
                                    </div>
                                    <p className="text-green-600 font-semibold mt-2 flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                                        In Stock - Ready to Ship
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Product Description</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Add to Cart Section */}
                                <div className="space-y-6">
                                    <button
                                        onClick={() => handleAddToCart({
                                            id: product._id,
                                            name: product.name,
                                            image: product.image,
                                            description: product.description,
                                            price: product.price,
                                            category: product.category
                                        })}
                                        className="w-full hover:cursor-pointer group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                                        <div className="relative flex items-center justify-center space-x-2">
                                            <ShoppingCart className="w-6 h-6" />
                                            <span className="text-xl">Add to Cart</span>
                                        </div>
                                    </button>
                                </div>

                                {/* Product Features */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose This Product?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-gray-700">Premium Quality</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-gray-700">Fast Delivery</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                            <span className="text-gray-700">Best Value</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                            <span className="text-gray-700">Customer Favorite</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
              <ToastContainer />

        </div>
    )
}

export default SingleProducts