import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/product/productApi';

function Categories() {
  const { Category } = useParams();
  const { data, isLoading } = useGetProductsQuery();

  const [Product, setProduct] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const filteredProducts = data.data.filter((product) => product.category === Category);
      setProduct(filteredProducts);
      setCategoryProducts(filteredProducts);
    }
  }, [data, Category]);

  const handleColorChange = (color) => {
    const colorProducts = categoryProducts.filter((product) => product.color === color);
    setProduct(colorProducts);
  };

  const displayAll = () => {
    setProduct(categoryProducts);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 capitalize tracking-wider">
        {Category}
      </h1>

      <div className="flex justify-center items-center gap-4 mb-12">
        <button
          onClick={displayAll}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition transform hover:scale-105"
        >
          All
        </button>
        {Category === 'Shirts' && (
          <>
            <button
              value="Black"
              className="h-9 w-9 rounded-full bg-black shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Black')}
            ></button>
            <button
              value="Blue"
              className="h-9 w-9 rounded-full bg-blue-700 shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Blue')}
            ></button>
            <button
              value="White"
              className="h-9 w-9 rounded-full bg-gray-100 border border-gray-300 shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('White')}
            ></button>
          </>
        )}
        {Category === 'Pants' && (
          <>
            <button
              value="Black"
              className="h-9 w-9 rounded-full bg-black shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Black')}
            ></button>
            <button
              value="Blue"
              className="h-9 w-9 rounded-full bg-blue-700 shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Blue')}
            ></button>
            <button
              value="Brown"
              className="h-9 w-9 rounded-full bg-amber-800 shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Brown')}
            ></button>
          </>
        )}
        {Category === 'Sweaters' && (
          <>
            <button
              value="Black"
              className="h-9 w-9 rounded-full bg-black shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Black')}
            ></button>
            <button
              value="Blue"
              className="h-9 w-9 rounded-full bg-blue-700 shadow-md hover:scale-110 transition"
              onClick={() => handleColorChange('Blue')}
            ></button>
          </>
        )}
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center"> */}
      <div className={Product.length < 4 ? 'flex justify-center gap-[1rem]' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center px-4'}>
        {Product.length > 0 ? (
          Product.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">{product.name}</h2>
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover rounded-lg mb-4 shadow-md"
              />
              <p className="text-gray-600 text-center mb-4 leading-relaxed">
                {product.description.slice(0, 100)}...
              </p>
              <p className="text-xl font-semibold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-xl hover:from-purple-700 hover:to-indigo-800 transition transform hover:scale-105 active:scale-95">
                <Link to={`/single-products/${product._id}`}>Explore</Link>
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600">No products found for this category or color.</div>
        )}
      </div>
    </div>
  );
}

export default Categories;