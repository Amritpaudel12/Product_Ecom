
import React, { useContext, useMemo, useState } from 'react';
import { useGetProductsQuery, useRemoveStockFromCartMutation } from '../services/product/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slice/cartSlice'; 
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ProductContext } from '../../ProductContext/index.jsx'; 

function Product({ newCartCount }) {
    const { setCount } = useContext(ProductContext);
    const { data, error, isLoading, refetch } = useGetProductsQuery();
    const [removeStockFromCart] = useRemoveStockFromCartMutation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [loadingItems, setLoadingItems] = useState(new Set());

    const allProducts = useMemo(() => data?.data || [], [data]);
    
    const Pants = useMemo(() => allProducts.filter(item => item.category === "Pants"), [allProducts]);
    const Sweaters = useMemo(() => allProducts.filter(item => item.category === "Sweaters"), [allProducts]);
    const Shirts = useMemo(() => allProducts.filter(item => item.category === "Shirts"), [allProducts]);

    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Filter by price range
        filtered = filtered.filter(item => {
            const price = parseFloat(item.price);
            return price >= priceRange[0] && price <= priceRange[1];
        });
        
        // Sort products
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return parseFloat(a.price) - parseFloat(b.price);
                case 'price-high':
                    return parseFloat(b.price) - parseFloat(a.price);
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'stock':
                    return b.stock - a.stock;
                default:
                    return 0;
            }
        });
    }, [allProducts, selectedCategory, searchTerm, priceRange, sortBy]);

    const categories = ['All', 'Pants', 'Sweaters', 'Shirts'];

    const notify = () => toast.success("🛍️ Product Added To Cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: '500',
        }
    });

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = `https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=500&fit=crop&crop=center`;
        e.target.alt = "Product Image";
    };

    const removeFromStock = async (_id, quantity) => {
        try {
            const response = await removeStockFromCart({ id: _id, quantity });
            if (response) {
                refetch(); 
            }
        } catch (error) {
            toast.error(`❌ Error removing stock: ${error.data?.message || error.error}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    const handleAddToCart = async (_id, quantity, product) => {
        setLoadingItems(prev => new Set(prev).add(_id));
        
        try {
            dispatch(addToCart(product));
            notify();

            removeFromStock(_id, quantity); 

            const response = await fetch('http://localhost:3000/api/cart/create-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user._id, 
                    productId: product.id, 
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: quantity,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add item to cart.');
            }

            const data = await response.json();
            console.log('Item successfully saved to backend cart:', data);
        } catch (error) {
            console.error('Error saving to backend cart:', error);
            toast.error(`❌ Could not save item: ${error.message}`, {
                position: "top-right",
            });
        } finally {
            setLoadingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(_id);
                return newSet;
            });
        }
    };

    const ProductCard = ({ product }) => (
        <div className='group relative flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 backdrop-blur-sm hover:border-purple-200'>
            {product.stock <= 5 && product.stock > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Only {product.stock} left!
                </div>
            )}
            
            {product.stock === 0 && (
                <div className="absolute top-4 left-4 z-10 bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Out of Stock
                </div>
            )}

            <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1'
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/10 backdrop-blur-[2px]">
                    <div className="bg-white/90 backdrop-blur-md rounded-full p-3 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                    <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                    </span>
                </div>

                <h3 className='text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300'>
                    {product.name}
                </h3>

                <p className='text-sm text-gray-600 mb-4 line-clamp-3 flex-1'>
                    {product.description}
                </p>

                <div className="mb-4">
                    {product.stock > 0 ? (
                        <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <span className="text-green-600 font-medium">In Stock ({product.stock})</span>
                        </div>
                    ) : (
                        <div className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                            <span className="text-red-600 font-medium">Out of Stock</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className='text-2xl font-bold text-gray-900'>
                            ${parseFloat(product.price).toFixed(2)}
                        </span>
                        <span className='text-sm text-gray-500'>Free shipping</span>
                    </div>

                    <button
                        className={`
                            px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform
                            flex items-center space-x-2 min-w-[120px] justify-center
                            ${product.stock > 0 
                                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }
                            ${loadingItems.has(product._id) ? 'cursor-wait' : ''}
                        `}
                        onClick={() => handleAddToCart(product._id, 1, {
                            id: product._id,
                            name: product.name,
                            image: product.image,
                            description: product.description,
                            price: parseFloat(product.price),
                            category: product.category,
                        })}
                        disabled={product.stock <= 0 || loadingItems.has(product._id)}
                    >
                        {loadingItems.has(product._id) ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                <span className="text-sm">Adding...</span>
                            </>
                        ) : product.stock > 0 ? (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-5M7 13l-2.5 5M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                                <span className="text-sm">Add to Cart</span>
                            </>
                        ) : (
                            <span className="text-sm">Unavailable</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200"></div>
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
                    </div>
                    <p className="mt-6 text-xl text-gray-700 font-medium">Loading amazing products...</p>
                    <p className="mt-2 text-sm text-gray-500">This won't take long</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                    <p className="text-red-600 font-medium">
                        {error.data?.message || error.error || 'Failed to load products'}
                    </p>
                    <button 
                        onClick={refetch}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100'>
            <ToastContainer />

            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-200 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                            Premium Collection
                        </h1>
                        <p className="text-xl md:text-2xl font-light text-purple-100 max-w-3xl mx-auto">
                            Explore our wide range of comfortable, stylish clothing tailored to your lifestyle.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`
                                        px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105
                                        ${selectedCategory === category 
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                                            : 'bg-white/80 text-gray-700 hover:bg-purple-100 border border-gray-200'
                                        }
                                    `}
                                >
                                    {category} {category !== 'All' && `(${category === 'Pants' ? Pants.length : category === 'Sweaters' ? Sweaters.length : Shirts.length})`}
                                </button>
                            ))}
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="stock">Stock Level</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                    <p className="text-gray-700 font-medium">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                        {searchTerm && ` for "${searchTerm}"`}
                    </p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm || selectedCategory !== 'All' 
                                ? "Try adjusting your filters or search terms" 
                                : "No products available at the moment"
                            }
                        </p>
                        {(searchTerm || selectedCategory !== 'All') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All');
                                }}
                                className="bg-purple-600 text-white px-6 py-3 rounded-2xl hover:bg-purple-700 transition-colors duration-300 font-medium"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>

      </div>   
    );
}

export default Product;