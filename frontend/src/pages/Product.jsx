
import { useContext, useMemo, useState } from 'react';
import { useGetProductsQuery, useRemoveStockFromCartMutation } from '../services/product/productApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slice/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductContext } from '../../ProductContext/index.jsx';
function Product({newCartCount}) {
     const { setCount } = useContext(ProductContext);
    const { data, error, isLoading, refetch } = useGetProductsQuery();
    const [removeStockFromCart] = useRemoveStockFromCartMutation();
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

    const removeFromStock = async (_id, quantity) => {
        try {
            const response = await removeStockFromCart({ id: _id, quantity });
            // console.log("Stock removed response: ", response);
            if (response) {
                refetch();
            }
        } catch (error) {
            toast.error(`Error removing stock: ${error.data?.message || error.error}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
            });
            console.log("Error removing stock: ", error);
        }
    };

    const handleAddToCart = async (_id, quantity, product) => {
        dispatch(addToCart(product));
        newCartCount(cartCount + 1);
        notify();

        removeFromStock(_id, quantity);
        refetch();
    };

    const renderProductCategory = (categoryName, productsArray) => (
        <div className='flex flex-col gap-10 items-center justify-center px-4 md:px-8 lg:px-16 py-10'>
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 tracking-tight">
                {categoryName}
            </h1>

            {productsArray.length > 0 ? (
                <div className={`${productsArray.length < 4 ? 'flex justify-center flex-wrap gap-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'}`}>
                    {productsArray.map((product) => (
                        <div
                            key={product._id}
                            className='group relative flex flex-col items-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 w-full max-w-xs border border-gray-100'
                        >
                            <div className="w-full h-52 overflow-hidden rounded-xl border border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                    onError={handleImageError}
                                />
                            </div>

                            <h2 className='mt-4 text-xl font-semibold text-gray-800 text-center line-clamp-2'>
                                {product.name}
                            </h2>

                            <h2 className='mt-4 text-xl font-semibold text-gray-800 text-center line-clamp-2'>
                                {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                            </h2>

                            <p className='text-sm text-gray-600 mt-2 text-center line-clamp-4'>
                                {product.description.slice(0, 150)}{product.description.length > 150 ? '...' : ''}
                            </p>

                            <p className='mt-3 text-lg font-bold text-green-600'>
                                ${parseFloat(product.price).toFixed(2)}
                            </p>

                            <button
                                className='mt-4 w-full bg-gradient-to-r hover:cursor-pointer from-purple-600 to-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:from-purple-700 hover:to-indigo-800 hover:scale-105 transition-transform duration-300'
                                onClick={() => handleAddToCart(product._id, 1, {
                                    id: product._id,
                                    name: product.name,
                                    image: product.image,
                                    description: product.description,
                                    price: parseFloat(product.price),
                                    category: product.category,
                                })}
                                disabled={product.stock <= 0}
                            >
                                Add To Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg py-10">
                    No {categoryName.toLowerCase()} found.
                </p>
            )}
        </div>
    );

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
