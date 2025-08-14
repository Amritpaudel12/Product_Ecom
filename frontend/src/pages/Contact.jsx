import React, { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useCreateContactMutation } from '../services/user/userApi';
import emailjs from '@emailjs/browser';

function Contact() {
  const [createContact] = useCreateContactMutation();

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init({
      publicKey: "3JmyFVoDRNus1RyQy",
    });
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Add from_name to match the email template
      const templateParams = {
        from_name: formData.get('name'), // Using name as from_name
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Send email using EmailJS
      await emailjs.sendForm(
        'service_gp23vce',
        'template_0i9yuub',
        e.target,
        templateParams
      );

      // Create contact in your backend
      await createContact(contact).unwrap();
      
      console.log("Contact submitted successfully and email sent");
      alert("Thank you for your message! We'll get back to you soon.");
      e.target.reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting your message. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.01]">
        <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-10 tracking-tight leading-tight">
          Get in Touch With Us
        </h1>

        <p className="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out through the options below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">Contact Info</h2>
            <div className="space-y-6">
              <div className="flex items-center text-gray-800 text-lg">
                <FaEnvelope className="text-purple-600 mr-4 text-2xl" />
                <span>info@productecom.com</span>
              </div>
              <div className="flex items-center text-gray-800 text-lg">
                <FaPhone className="text-purple-600 mr-4 text-2xl" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center text-gray-800 text-lg">
                <FaMapMarkerAlt className="text-purple-600 mr-4 text-2xl" />
                <span>123 Fashion Ave, Style City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center text-center p-6 bg-purple-50 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">Connect With Us</h2>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 transform hover:scale-125 transition duration-300"
              >
                <FaFacebook className="text-5xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transform hover:scale-125 transition duration-300"
              >
                <FaInstagram className="text-5xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900 transform hover:scale-125 transition duration-300"
              >
                <FaLinkedin className="text-5xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gray-50 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Send Us a Message</h2>
          <form onSubmit={handleContact} className="space-y-6">
            <input type="hidden" name="from_name" id="from_name" />
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-y"
                placeholder="Your message to us..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:from-purple-700 hover:to-indigo-800 transition transform hover:scale-105 active:scale-95"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
