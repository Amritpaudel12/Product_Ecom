
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Admin Login Data:", loginData);

        const ADMIN_EMAIL = 'Amrit Paudel';
        const ADMIN_PASSWORD = 'amrit123';

        if (loginData.email === ADMIN_EMAIL && loginData.password === ADMIN_PASSWORD) {
            setLoginStatus('Login successful! Redirecting...');
            console.log("Admin Login Successful!");
            navigate('/admin/dashboard');
        } else {
            setLoginStatus('Invalid email or password.');
            console.log("Admin Login Failed: Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-8 tracking-tight">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out text-gray-800"
                            placeholder="username"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out text-gray-800"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                {loginStatus && (
                    <p className={`mt-4 text-center ${loginStatus.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                        {loginStatus}
                    </p>
                )}
                <p className="mt-8 text-center text-sm text-gray-600">
                    Access restricted to authorized personnel.
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;
