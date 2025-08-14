import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="images/hero.jpg"
          alt="Fashion background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-4xl mx-auto">
          <h1
            className={`font-serif text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl mb-6 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Ecommerce
          </h1>
          <p
            className={`font-light text-lg md:text-xl leading-relaxed text-gray-100 mb-10 drop-shadow-lg transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Discover fashion like never before! Our eCommerce platform offers a stunning collection of clothing across multiple categories—trendy streetwear, elegant formalwear, cozy casuals, and more. Find the perfect outfit with ease, enjoy seamless shopping, and experience unbeatable style. Shop now and redefine your wardrobe with the latest fashion trends!
          </p>
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <Link to="/products">
              <button className="px-10 py-4 bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-bold text-lg rounded-full shadow-lg hover:from-purple-800 hover:to-indigo-900 transition-all transform hover:scale-105 active:scale-95 border-2 border-transparent hover:border-white">
                Explore Now
              </button>
            </Link>
            <Link to="/about">
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-full shadow-lg hover:bg-white hover:text-purple-700 transition-all transform hover:scale-105 active:scale-95">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <h1 className="text-4xl md:text-5xl text-center font-extrabold text-purple-800 mb-12 tracking-wide">
          Shop by Category
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-8 max-w-6xl mx-auto px-4">
          <Link to="/categories/Pants" className="group block">
            <div className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
              <img
                src="images/Pant.jpeg"
                alt="Pants category"
                className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">Pants</h2>
                <p className="text-lg mb-4 opacity-90">Stylish and comfortable for every occasion.</p>
                <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>

          <Link to="/categories/Shirts" className="group block">
            <div className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
              <img
                src="images/Shirt.jpeg"
                alt="Shirts category"
                className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">Shirts</h2>
                <p className="text-lg mb-4 opacity-90">From casual to formal, find your perfect top.</p>
                <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>

          <Link to="/categories/Sweaters" className="group block">
            <div className="relative overflow-hidden rounded-xl shadow-xl transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
              <img
                src="images/Sweater.jpeg"
                alt="Sweaters category"
                className="w-full h-80 object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">Sweaters</h2>
                <p className="text-lg mb-4 opacity-90">Cozy comfort for cooler days.</p>
                <button className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-105">
                  Shop Now
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
