import React from 'react';

function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-800 leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
          About Our Journey
        </h1>
        <p className="text-gray-700 text-xl md:text-2xl mt-6 max-w-3xl mx-auto font-light animate-fade-in delay-200">
          Discover the story behind our passion for bringing you the best online shopping experience.
        </p>
      </div>

      <div className="max-w-4xl w-full space-y-10 text-gray-800 text-lg leading-relaxed font-light">
        <div className="relative p-6 sm:p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl">
          <p className="pl-6 border-l-4 border-purple-500">
            Welcome to our e-commerce platform, where passion meets purpose! We are deeply committed to revolutionizing your online shopping experience, striving tirelessly to make it seamless, delightful, and truly unforgettable. Our core mission is elegantly simple yet profoundly impactful: to offer an expansive and meticulously curated collection of high-quality products, all while ensuring competitive prices and unparalleled customer satisfaction at every interaction.
          </p>
        </div>

        <div className="relative p-6 sm:p-8 bg-purple-50 bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl border border-purple-100 transform transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl">
          <p className="pr-6 border-r-4 border-indigo-500 text-right">
            Our vibrant team is fueled by a collective enthusiasm for discovering and presenting a diverse array of products that genuinely resonate with your unique needs and evolving preferences. Whether you're seeking the latest fashion trends, cutting-edge electronics, charming home essentials, or a myriad of other treasures, we diligently work to bring you both the contemporary and the timeless.
          </p>
        </div>

        <div className="relative p-6 sm:p-8 bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl">
          <p className="pl-6 border-l-4 border-purple-500">
            Every product in our catalog is chosen with care, aiming to enrich your life and bring a touch of joy to your everyday. We believe in building lasting relationships with our community, grounded in trust, quality, and exceptional service. We are constantly evolving, listening to your feedback, and integrating the latest innovations to enhance your journey with us.
          </p>
        </div>

        <p className="text-center pt-8 text-2xl font-medium text-purple-800 animate-fade-in delay-500">
          Thank you for embarking on this incredible shopping journey with us. We are genuinely excited to serve you and help you discover something truly special!
        </p>
      </div>
    </div>
  );
}

export default About;
