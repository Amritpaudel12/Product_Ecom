import React from 'react';
import { HiUsers, HiClipboardList, HiCog } from 'react-icons/hi'; 
import { FaChartBar, FaBox } from 'react-icons/fa'; 

function Sidebar() {
  const navLinks = [
    { name: 'Dashboard', icon: <FaChartBar className="text-2xl" />, href: '#' }, 
    { name: 'Users', icon: <HiUsers className="text-2xl" />, href: '/admin/users' },
    { name: 'Products', icon: <FaBox className="text-2xl" />, href: '/admin/products' }, 
    { name: 'Settings', icon: <HiCog className="text-2xl" />, href: '/admin/settings' },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-800 to-purple-900 text-white flex flex-col rounded-r-xl shadow-lg">
      <div className="p-6 text-center border-b border-indigo-700">
        <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name} className="mb-3">
              <a
                href={link.href}
                className="flex items-center px-4 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 hover:text-white transition duration-200 ease-in-out transform hover:scale-105"
              >
                <span className="mr-4">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 border-t border-indigo-700 text-center text-sm text-indigo-200">
        © 2025 Product_Ecom. All rights reserved.
      </div>
    </div>
  );
}

export default Sidebar;