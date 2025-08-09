import React, { useEffect, useState } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

import { HiUsers, HiClipboardList, HiEye, HiCog } from 'react-icons/hi';
import { FaUserPlus, FaPlusCircle, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/product/productApi';
import { useGetAllUsersQuery } from '../../services/user/userApi';
function Dashboard() {
  const [cart, setCart] = useState({ product: [] });
  const { data } = useGetProductsQuery();
  const { data: userData } = useGetAllUsersQuery();
  console.log("user data ", userData);
  console.log("data ", data);

  const totalStock = Array.isArray(data?.data) && data.data.length > 0
    ? data.data.reduce((total, item) => total + (item.stock || 0), 0)
    : 0;

  const totalUsers = Array.isArray(userData?.data) && userData.data.length > 0
    ? userData.data.length
    : 0;

  const totalStockAmount = localStorage.getItem('cart');
  const parsedCart = totalStockAmount ? JSON.parse(totalStockAmount) : { product: [] };
  // console.log("cart details ", parsedCart);

  console.log("total stock amount ", totalStockAmount);
  const productsInCart = parsedCart.product || [];
  // console.log("products in cart ", productsInCart);

  const totalAmount = Array.isArray(data?.data) && data.data.length > 0
    ? productsInCart.reduce((total, item) => total + (item.price || 0), 0)
    : 0;

    console.log("total amount ", totalAmount);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl p-8 lg:p-12">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
              <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105">
                New Report
              </button>
            </div>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Welcome back, Administrator! Here's a quick overview of your activities. Manage users, products, and orders efficiently from this central hub.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                    <HiUsers className="h-8 w-8" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-gray-800">Total Users</h3>
                </div>
                <p className="text-5xl font-bold text-gray-900">{totalUsers}</p>
                <p className="text-green-500 mt-2 text-md">+0% last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-purple-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                    <FaBox className="h-8 w-8" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-gray-800">Products in Stock</h3>
                </div>
                <p className="text-5xl font-bold text-gray-900">
                  {
                    totalStock > 0 ? totalStock : '0'
                  }
                </p>
                <p className="text-yellow-600 mt-2 text-md">3 new products this week</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-full text-green-600">
                    <HiClipboardList className="h-8 w-8" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-gray-800">Pending Orders</h3>
                </div>
                <p className="text-5xl font-bold text-gray-900">{cart.product.length}</p>
                <p className="text-red-500 mt-2 text-md">Requires immediate attention</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-green-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-full text-green-600">
                  <HiClipboardList className="h-8 w-8" />
                </div>
                <h3 className="ml-4 text-2xl font-semibold text-gray-800">Total Stock Amount</h3>
              </div>
              <p className="text-5xl font-bold text-gray-900">{Math.round(totalAmount)}</p>
              <p className="text-red-500 mt-2 text-md">Requires immediate attention</p>
            </div>
          {/* </div> */}

          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to={'/admin/users'} className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-indigo-700">
                <FaUserPlus className="h-10 w-10 mb-2" />
                <span className="text-lg font-medium">All User</span>
              </Link>
              <Link to={'/admin/products'} className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-teal-700">
                <FaPlusCircle className="h-10 w-10 mb-2" />
                <span className="text-lg font-medium">New Product</span>
              </Link>
              <Link to={'/admin/order'} className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-orange-700">
                <HiEye className="h-10 w-10 mb-2" />
                <span className="text-lg font-medium">View Orders</span>
              </Link>
              <Link to={'/admin/settings'} className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105 text-red-700">
                <HiCog className="h-10 w-10 mb-2" />
                <span className="text-lg font-medium">Settings</span>
              </Link>
            </div>
          </div>
      </div>
    </main>
      </div >
    </div >
  );
}

export default Dashboard;