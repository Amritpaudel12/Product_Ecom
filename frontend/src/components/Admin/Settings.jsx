import React from 'react';

function Settings() {
  const adminDetails = {
    name: "Amrit Paudel",
    email: "amrit123",
    role: "Administrator",
    lastLogin: "2025-06-28 10:30 AM"
  };
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return (
      <div className="settings-container">
        <h1>Settings</h1>
        <p>Loading admin details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="settings-container">
        <h1>Settings</h1>
        <p>Error loading admin details: {error.message || 'Something went wrong.'}</p>
      </div>
    );
  }

  return (
    <div className="settings-container bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Admin Settings</h1>

        <div className="space-y-6">
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-semibold w-1/3">Name:</span>
            <span className="text-gray-800 font-medium w-2/3">{adminDetails.name}</span>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-semibold w-1/3">Email:</span>
            <span className="text-gray-800 font-medium w-2/3">{adminDetails.email}</span>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-semibold w-1/3">Role:</span>
            <span className="text-gray-800 font-medium w-2/3">{adminDetails.role}</span>
          </div>
          <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-semibold w-1/3">Last Login:</span>
            <span className="text-gray-800 font-medium w-2/3">{adminDetails.lastLogin}</span>
          </div>
        </div>

        <p className="mt-8 text-center text-gray-600 text-lg">
          Additional settings and configurations will be available here.
        </p>
      </div>
    </div>
  );
}

export default Settings;