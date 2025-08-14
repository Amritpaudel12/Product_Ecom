import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../slice/userSlice';
import { clearCart, initializeUserCart } from '../../slice/cartSlice';
import { useLogoutUserMutation } from '../../services/user/userApi';
import { useAuth0 } from "@auth0/auth0-react";
import { ProductContext } from '../../../ProductContext/index.jsx';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect } from 'react';
import defaultAvatar from '../../assets/amrit.jpg';
const sections = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  },
  {
    path: '/products',
    name: 'Product'
  },
  {
    path: '/cart',
    name: 'Cart'
  },
];

function Navbar() {
   const { cartCount } = useContext(ProductContext);
  let { user, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  let User = useSelector(state => state.user);
  User = User.user;

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (User?.email) {
      dispatch(initializeUserCart(User.email));
    }
  }, [User, dispatch]);

  const handleLogout = async () => {
    dispatch(removeUser());
    dispatch(clearCart());  // Clear the cart when logging out
    try {
      await logoutUser();
      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (error) {
      console.log("error occurred while logout ", error.message);
    }
  };

  if (isAuthenticated && !User) {
    User = {
      name: user.name,
      email: user.email,
      picture: user.picture  || defaultAvatar,
      cartCount: user.cartCount || 0, // Ensure cartCount is set
      // cartCount: JSON.parse(localStorage.getItem('cartCount')) || 0
    };
    localStorage.setItem('user', JSON.stringify(User));
  }

  return (
    <nav className="h-20 flex justify-between items-center px-6 md:px-12 bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50 rounded-b-lg">
      <div>
        <h1 className="font-bold text-3xl tracking-wide font-sans text-white"><Link to={'/'}>Ecommerce</Link></h1>
      </div>
      <ul className="flex items-center space-x-6">
        {sections.map((section, index) => (
          <Link to={section.path} key={index}>
            <li className="font-semibold text-lg hover:text-purple-200 transition duration-300 transform hover:scale-105 flex items-center">
              {section.path === '/cart' ? (
                <div className="relative flex items-center">
                  <FaShoppingCart className="text-xl mr-1" />
                  <span>{section.name}</span>
                  {cartCount > 0 && (
                    <div className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                      {cartCount}
                    </div>
                  )}
                </div>
              ) : (
                section.name
              )}
            </li>
          </Link>
        ))}
        {User && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 font-bold text-white rounded-full shadow-md hover:bg-red-700 transition transform hover:scale-105"
            >
              Logout
            </button>
            <div className="flex items-center gap-2">
              {User.picture && (
                <img
                  src={User.picture}
                  alt={User.name}
                  className="h-10 w-10 rounded-full border-2 border-white shadow-sm"
                />
              )}
              {User.name && <h2 className="text-lg font-semibold">{User.name}</h2>}
            </div>
          </div>
        )}
        {isAuthenticated && !User && (
          <div className="flex gap-3">
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="px-6 py-2 bg-red-600 font-bold text-white rounded-full shadow-md hover:bg-red-700 transition transform hover:scale-105"
            >
              Logout
            </button>
            <Link to="/login">
              <button className="px-6 py-2 bg-purple-500 font-bold text-white rounded-full shadow-md hover:bg-purple-600 transition transform hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        )}
        {!User && !isAuthenticated && (
          <div className="flex gap-3">
            <Link to="/signup">
              <button className="px-6 py-2 bg-green-500 font-bold text-white rounded-full shadow-md hover:bg-green-600 transition transform hover:scale-105">
                Signup
              </button>
            </Link>
            <Link to="/login">
              <button className="px-6 py-2 bg-purple-500 font-bold text-white rounded-full shadow-md hover:bg-purple-600 transition transform hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
