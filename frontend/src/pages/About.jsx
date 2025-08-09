import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShoppingBag, FaStar, FaGlobe } from 'react-icons/fa';
import amrit from '../assets/amrit.jpg';
import ashish from '../assets/ashish.jpg';
import narayan from '../assets/lady.jpg';
function About() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    { icon: <FaUsers className="w-8 h-8" />, value: '50+', label: 'Happy Customers' },
    { icon: <FaShoppingBag className="w-8 h-8" />, value: '1K+', label: 'Products' },
    { icon: <FaStar className="w-8 h-8" />, value: '4.8', label: 'Average Rating' },
    { icon: <FaGlobe className="w-8 h-8" />, value: '24/7', label: 'Support' },
  ];

  const team = [
    { name: "Amrit Paudel", role: "CEO & Founder", image: amrit },
    { name: "Ashish Paudel", role: "Creative Director", image: ashish },
    { name: "Lady Paudel", role: "Lead Developer", image: narayan },
  ];

  const testimonials = [
    { author: "Tushant A.", text: "The best shopping experience I've ever had online!" },
    { author: "Shreeshant A.", text: "Outstanding product quality and customer service." },
    { author: "Manoj K.", text: "Incredible selection and fast delivery." },
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize online shopping' },
    { year: '2021', title: 'Rapid Growth', description: 'Expanded to serve over 10,000 customers' },
    { year: '2022', title: 'International Launch', description: 'Started serving customers globally' },
    { year: '2023', title: 'Innovation Award', description: 'Recognized for outstanding e-commerce solutions' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-20 px-4 sm:px-6 lg:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center mb-16"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-800 tracking-tight leading-tight drop-shadow-md">
          About Our Journey
        </h1>
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-700 font-light max-w-3xl mx-auto">
          Discover the story behind our passion for delivering the best online shopping experience.
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full mb-20">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg"
          >
            <div className="text-purple-600 mb-3">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="max-w-4xl w-full mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To revolutionize online shopping by providing exceptional products, unmatched service, and innovative solutions that enrich our customers' lives.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become the world's most customer-centric e-commerce platform, where people can discover and purchase anything they desire.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl w-full mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                <img width={128} height={128} src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-purple-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl w-full mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Journey</h2>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
            >
              <div className="w-1/2 p-6">
                <div className="text-2xl font-bold text-purple-700">{milestone.year}</div>
                <div className="text-xl font-semibold text-gray-800">{milestone.title}</div>
                <div className="text-gray-600">{milestone.description}</div>
              </div>
              <div className="w-px h-20 bg-purple-300"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl w-full mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="relative">
          <motion.div
            key={activeTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <p className="text-xl text-gray-600 mb-4">{testimonials[activeTestimonial].text}</p>
            <p className="font-semibold text-purple-700">- {testimonials[activeTestimonial].author}</p>
          </motion.div>
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeTestimonial ? 'bg-purple-600' : 'bg-purple-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
