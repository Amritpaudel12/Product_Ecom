import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


function Contact() {
  return (
    <div className='h-[70vh] flex flex-col justify-center items-center gap-[4rem]'>
      <h1 className='text-[3rem] font-bold font-sans text-purple-600'>Contact With US</h1>
      <div className="flex space-x-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 text-3xl" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-500 text-3xl" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-blue-800 text-3xl" />
        </a>
      </div>
    </div>
  )
}

export default Contact