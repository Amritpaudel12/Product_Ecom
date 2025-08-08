
import React, { useMemo } from 'react';
import { useGetProductsQuery } from '../services/product/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const { data, error, isLoading } = useGetProductsQuery();
    const dispatch = useDispatch();

    const Pants = useMemo(() => data?.data.filter(item => item.category === "Pants") || [], [data]);
    const Sweaters = useMemo(() => data?.data.filter(item => item.category === "Sweaters") || [], [data]);
    const Shirts = useMemo(() => data?.data.filter(item => item.category === "Shirts") || [], [data]);

    const notify = () => toast.success("Product Added To Cart Successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/300x400/cccccc/333333?text=Image+Not+Found`;
        e.target.alt = "Image Not Found";
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
                <p className="ml-4 text-xl text-gray-700">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-600 text-lg font-medium p-8">
                <p>Error fetching products: {error.data?.message || error.error || 'An unknown error occurred'}</p>
            </div>
        );
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        notify();
    };

    const renderProductCategory = (categoryName, productsArray) => (
        <div className='flex flex-col gap-8 items-center justify-center'>
            <h1 className="text-5xl md:text-6xl font-extrabold text-center text-purple-700 tracking-tight">
                {categoryName}
            </h1>
            {productsArray.length > 0 ? (
                <div className={productsArray.length < 4 ? 'flex justify-center gap-[1rem]' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center px-4'}>
                    {productsArray.map((product) => (
                        <div key={product._id} className='flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 w-full max-w-sm border border-gray-100'>
                            <h2 className='text-2xl font-bold font-sans text-gray-800 text-center'>{product.name}</h2>
                            <div className="w-full h-64 overflow-hidden rounded-lg border border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                                    onError={handleImageError}
                                />
                            </div>
                            <p className='text-justify text-gray-600 text-sm h-24 overflow-hidden'>
                                {product.description.slice(0, 150)}{product.description.length > 150 ? '...' : ''}
                            </p>
                            <p className='text-lg font-semibold text-green-600'>Price: ${parseFloat(product.price).toFixed(2)}</p>
                            <button
                                className='mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 font-bold text-lg'
                                onClick={() => handleAddToCart({
                                    id: product._id,
                                    name: product.name,
                                    image: product.image,
                                    description: product.description,
                                    price: parseFloat(product.price),
                                    category: product.category,
                                })}
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-xl py-10">No {categoryName.toLowerCase()} found.</p>
            )}
        </div>
    );

    return (
        <div className='flex flex-col gap-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen py-12'>
            <ToastContainer />
            {renderProductCategory("Pants", Pants)}
            {renderProductCategory("Sweaters", Sweaters)}
            {renderProductCategory("Shirts", Shirts)}
        </div>
    );
}

export default Product;
