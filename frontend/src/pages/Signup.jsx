import React, { useState } from 'react';
import { useRegisterUserMutation } from '../services/user/userApi';
import { useAuth0 } from "@auth0/auth0-react";
import { IoLogoGoogle } from "react-icons/io";

function Signup() {
    const [registerUser] = useRegisterUserMutation();
    const { loginWithRedirect } = useAuth0();

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("signupData ", signupData);
        try {
            const response = await registerUser(signupData);
            console.log("signup res ",response);
            if (response.data.statusCode === 201) {
                alert("User Registered Successfully");
            }
        } catch (error) {
            alert("Registration failed. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-100 p-6">
            <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={signupData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signupData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
                    >
                        Sign Up
                    </button>
                    <div className="text-center text-gray-500 text-sm">or</div>
                    <button
                        type="button"
                        onClick={() =>
                            loginWithRedirect({
                                connection: "google-oauth2",
                                prompt: "select_account",
                            })
                        }
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:shadow-md transition"
                    >
                        <IoLogoGoogle size={20} />
                        <span className="font-medium">Sign up with Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;