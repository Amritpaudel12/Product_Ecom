import React, { useMemo, useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Edit,
  Shield,
  Heart,
  ShoppingBag,
  MapPin,
  Phone,
  Save,
  X,
  Camera,
  Crown,
  History,
  CreditCard
} from 'lucide-react';
import { FaCreditCard, FaHeart, FaSave, FaShoppingBag, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, getUserCart, incrementQuantity, removeItemFromCart } from '../slice/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loadingItems, setLoadingItems] = useState(new Set());

  const setItemLoading = (productId, isLoading) => {
    setLoadingItems(prev => {
      const newSet = new Set(prev);
      if (isLoading) {
        newSet.add(productId);
      } else {
        newSet.delete(productId);
      }
      return newSet;
    });
  };

  const user = useSelector((state) => state.user.user);

  const userProducts = getUserCart(user?.email);
  console.log("user ", user);
  console.log("user products ", userProducts);

  const dispatch = useDispatch();

  const handleRemoveItem = async (productId) => {
    setItemLoading(productId, true);

    if (!user || !user._id) {
      toast.error("User not logged in. Cannot remove item from backend.");
      dispatch(removeItemFromCart({ productId }));
      setItemLoading(productId, false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart/remove-cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId,
        }),
      });

      if (response.ok) {
        dispatch(removeItemFromCart({ productId }));
        const data = await response.json();
        toast.success("🗑️ Item removed from cart", {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
          }
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove item from the backend cart.');
      }
    } catch (error) {
      console.error('Error removing from backend cart:', error);
      toast.error(`Could not remove item: ${error.message}`);
    } finally {
      setItemLoading(productId, false);
    }
  };


  const handleIncrementQuantity = async (productId) => {
    setItemLoading(productId, true);
    dispatch(incrementQuantity({ productId }));

    if (!user || !user._id) {
      toast.warn("Quantity updated locally. Login to sync with backend.");
      setItemLoading(productId, false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId, type: 'increment' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity on backend.');
      }
    } catch (error) {
      console.error('Error updating quantity on backend:', error);
      toast.error(`Failed to update quantity: ${error.message}`);
      dispatch(decrementQuantity({ productId }));
    } finally {
      setItemLoading(productId, false);
    }
  };

  const handleDecrementQuantity = async (productId, currentQuantity) => {
    setItemLoading(productId, true);

    if (currentQuantity <= 1) {
      await handleRemoveItem(productId);
      return;
    }

    dispatch(decrementQuantity({ productId }));

    if (!user || !user._id) {
      toast.warn("Quantity updated locally. Login to sync with backend.");
      setItemLoading(productId, false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/cart/update-quantity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, productId, type: 'decrement' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update quantity on backend.');
      }
    } catch (error) {
      console.error('Error updating quantity on backend:', error);
      toast.error(`Failed to update quantity: ${error.message}`);
      dispatch(incrementQuantity({ productId }));
    } finally {
      setItemLoading(productId, false);
    }
  };

  const [userData, setUserData] = useState({
    id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isAdmin: user.isAdmin,
    isAuthenticatedWithAuth0: user.isAuthenticatedWithAuth0,
    firstName: user.username.split(' ')[0],
    lastName: user.username.split(' ')[1],
    phone: "+977-9800000000",
    address: "Kathmandu, Nepal",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const subtotal = useMemo(() => {
    return userProducts.reduce((total, item) => {
      return total + (item.price || 0) * item.quantity;
    }, 0);
  }, [userProducts]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  const renderProfileContent = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={userData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute -bottom-2 -right-2 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Camera className="text-sm" size={16} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
              {userData.isAdmin && (
                <Crown className="text-yellow-300 text-lg" size={18} />
              )}
            </div>
            <p className="text-blue-100 mb-2">@{userData.username}</p>
            <p className="text-blue-200 text-sm">Member since {formatDate(userData.createdAt)}</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-colors flex items-center space-x-2 backdrop-blur-sm"
          >
            <Edit />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">Personal Information</h2>
          <p className="text-gray-600">Manage your personal details and preferences</p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <User className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-gray-800">{userData.firstName} {userData.lastName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <Mail className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-800">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <Phone className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-gray-800">{userData.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <MapPin className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-800">{userData.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <Calendar className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Joined</p>
                  <p className="text-gray-800">{formatDate(userData.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <Shield className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Account Type</p>
                  <p className="text-gray-800 flex items-center space-x-2">
                    <span>{userData.isAdmin ? 'Administrator' : 'Customer'}</span>
                    {userData.isAdmin && <Crown className="text-yellow-500" size={16} />}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Orders</p>
              <p className="text-2xl font-bold">{userProducts.length}</p>
            </div>
            <ShoppingBag className="text-3xl text-green-200" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Wishlist Items</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <FaHeart className="text-3xl text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Total Spent</p>
              <p className="text-2xl font-bold">${subtotal}</p>
            </div>
            <FaCreditCard className="text-3xl text-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        </div>
        {
          userProducts.length > 0 ? userProducts.map((product) => {
            return <div key={product.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded" />
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                  <p className="text-sm text-gray-800 font-medium">Price: Rs. {product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrementQuantity(product.id, product.quantity)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-l-md hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 text-gray-800 px-4 py-1">{product.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(product.id)}
                      className="bg-gray-200 text-gray-700 px-3 py-1 rounded-r-md hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600 hover:text-red-800 font-medium text-sm"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }) : <div className="p-6">
            <div className="text-center py-12">
              <FaShoppingBag className="text-4xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
              <Link to='/products'>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        }

      </div>
    </div>
  );

  const renderWishlistContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Wishlist Items</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <FaHeart className="text-4xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your wishlist is empty</p>
            <Link to='/products'>
              <button className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Change Password</p>
              <p className="text-sm text-gray-600">Update your account password</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Change
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Login History</p>
              <p className="text-sm text-gray-600">View recent account activity</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile and account settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <tab.icon />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            {activeTab === 'profile' && renderProfileContent()}
            {activeTab === 'orders' && renderOrdersContent()}
            {activeTab === 'wishlist' && renderWishlistContent()}
            {activeTab === 'security' && renderSecurityContent()}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaSave />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;