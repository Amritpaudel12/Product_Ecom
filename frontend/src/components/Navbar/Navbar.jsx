
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeUser } from '../../slice/userSlice';
import { clearCart, initializeUserCart } from '../../slice/cartSlice';
import { useLogoutUserMutation } from '../../services/user/userApi';
import { useAuth0 } from "@auth0/auth0-react";
import { ProductContext } from '../../../ProductContext/index.jsx';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useEffect } from 'react';
import defaultAvatar from '../../assets/amrit.jpg';

const sections = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/products',
    name: 'Products'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  }
];

function Navbar() {
  const { cartCount } = useContext(ProductContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  
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
    dispatch(clearCart());  
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
      picture: user.picture || defaultAvatar,
      cartCount: user.cartCount || 0,
    };
    localStorage.setItem('user', JSON.stringify(User));
  }

  const isActiveLink = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span>Free shipping on orders over $99 | Use code: FREESHIP</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                <FaShoppingCart className="text-xl" />
              </div>
              <span className="text-2xl font-bold text-gray-800 tracking-tight">
                ShopHub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section, index) => (
              <Link
                to={section.path}
                key={index}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-blue-600 hover:bg-gray-50 ${
                  isActiveLink(section.path)
                    ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
                    : 'text-gray-700'
                }`}
              >
                {section.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-200"
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {User ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-full transition-all duration-200"
                >
                  <img
                    src={User.picture}
                    alt={User.name}
                    className="h-8 w-8 rounded-full border-2 border-gray-300"
                  />
                  <span className="hidden sm:block text-sm font-medium">
                    {User.name?.split(' ')[0]}
                  </span>
                  <FaChevronDown className="text-xs" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <p className="font-medium">{User.name}</p>
                        <p className="text-gray-500 text-xs">{User.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/cart"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      >
                        Wishlist
                      </Link>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all duration-200">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="relative mb-3">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {sections.map((section, index) => (
                <Link
                  to={section.path}
                  key={index}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveLink(section.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.name}
                </Link>
              ))}

              {!User && (
                <div className="pt-4 border-t border-gray-200">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full mb-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;