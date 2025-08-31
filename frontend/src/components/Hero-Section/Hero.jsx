
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const slides = [
    {
      id: 1,
      image: 'images/hero.jpg',
      title: 'Summer Collection 2025',
      subtitle: 'Up to 60% Off',
      description: 'Discover the latest trends in summer fashion with incredible savings',
      cta: 'Shop Summer Sale',
      ctaLink: '/products?category=summer',
      overlay: 'from-purple-900/80 via-indigo-800/60 to-blue-700/40'
    },
    {
      id: 2,
      image: 'images/hero.jpg',
      title: 'Premium Formal Wear',
      subtitle: 'Professional Excellence',
      description: 'Elevate your professional wardrobe with our premium collection',
      cta: 'View Collection',
      ctaLink: '/products?category=formal',
      overlay: 'from-gray-900/80 via-slate-800/60 to-gray-700/40'
    },
    {
      id: 3,
      image: 'images/hero.jpg',
      title: 'Casual Comfort Zone',
      subtitle: 'Everyday Essentials',
      description: 'Comfort meets style in our curated casual wear collection',
      cta: 'Shop Casual',
      ctaLink: '/products?category=casual',
      overlay: 'from-emerald-900/80 via-teal-800/60 to-cyan-700/40'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Amazing quality and fast delivery! The clothes fit perfectly and the customer service is outstanding.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b913?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 5,
      text: 'Best online shopping experience! Great variety, competitive prices, and hassle-free returns.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      rating: 5,
      text: 'Love the style and quality! My go-to store for all fashion needs. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On orders over $100'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Quality Guarantee',
      description: '30-day money back'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '24/7 Support',
      description: 'Always here to help'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Payment',
      description: 'SSL encrypted checkout'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative">
      <div className="relative h-[90vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.overlay}`}></div>
          </div>
        ))}

        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div
                className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                  }`}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                    {currentSlideData.title}
                  </span>
                </h1>
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-6">
                  {currentSlideData.subtitle}
                </div>
              </div>

              <p
                className={`text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
              >
                {currentSlideData.description}
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
              >
                <Link to={currentSlideData.ctaLink}>
                  <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 active:scale-95 hover:shadow-purple-500/25">
                    <span className="flex items-center gap-3">
                      {currentSlideData.cta}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                      </svg>
                    </span>
                  </button>
                </Link>
                <Link to="/products">
                  <button className="px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-2xl shadow-xl hover:bg-white/30 hover:border-white/50 transition-all transform hover:scale-105 active:scale-95">
                    Browse All Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all group"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all group"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:from-purple-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-2xl font-bold mb-1">Flash Sale! Limited Time Only</h3>
              <p className="text-pink-100">Get up to 70% off on selected items</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds }
                ].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 min-w-[60px]">
                      <div className="text-2xl font-bold">{time.value.toString().padStart(2, '0')}</div>
                    </div>
                    <div className="text-xs text-pink-100 mt-1">{time.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/products?sale=true">
                <button className="bg-white text-red-500 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Shop by <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our carefully curated collections designed for every style and occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Pants',
                image: 'images/Pant.jpeg',
                description: 'From casual denim to formal trousers',

                link: '/categories/Pants',
                color: 'from-blue-600 to-cyan-600'
              },
              {
                name: 'Shirts',
                image: 'images/Shirt.jpeg',
                description: 'Professional and casual shirts',

                link: '/categories/Shirts',
                color: 'from-green-600 to-teal-600'
              },
              {
                name: 'Sweaters',
                image: 'images/Sweater.jpeg',
                description: 'Cozy comfort for every season',

                link: '/categories/Sweaters',
                color: 'from-purple-600 to-pink-600'
              }
            ].map((category, index) => (
              <Link key={category.name} to={category.link} className="group block">
                <div className="relative overflow-hidden rounded-3xl shadow-lg bg-white transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl">
                  <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={`${category.name} category`}
                      className="w-full h-80 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="text-white">

                      <h3 className="text-4xl font-bold mb-2 drop-shadow-lg">
                        {category.name}
                      </h3>
                      <p className="text-lg text-gray-200 mb-4 opacity-90">
                        {category.description}
                      </p>
                      <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all transform group-hover:translate-y-[-4px] border border-white/30">
                        Explore Collection
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-purple-100">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-gray-600">Verified Customer</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                    ? 'bg-purple-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Hero;