import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex flex-col md:flex-col items-center gap-6">
          <div className="text-2xl font-bold flex items-center gap-2">
            Product Ecom
            <span className="text-gray-400 text-base ml-2">&copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaEnvelope className="text-lg" />
            <span>productecom@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition">Home</a>
          <a href="#" className="hover:text-white transition">Shop</a>
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>
        <div className="hidden md:flex flex-col gap-2 text-gray-400 text-sm ml-8">
          <span className="font-semibold text-gray-200 mb-1">Customer Service</span>
          <span>FAQ</span>
          <span>Returns & Exchanges</span>
          <span>Shipping Info</span>
          <span>Privacy Policy</span>
        </div>
        <div className="hidden md:flex flex-col gap-2 text-gray-400 text-sm ml-8">
          <span className="font-semibold text-gray-200 mb-1">Contact Us</span>
          <span>+1 234 567 8901</span>
          <span>123 Market Street, City, Country</span>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0 md:flex-col">
          <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">
            <FaFacebookF size={22} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">
            <FaInstagram size={22} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition">
            <FaTwitter size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer