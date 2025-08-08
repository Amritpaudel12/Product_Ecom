
import React, { useState, useEffect } from 'react';
import { useLoginUserMutation } from '../services/user/userApi';
import { useDispatch } from 'react-redux';
import { saveUser, removeUser } from '../slice/userSlice';
import { useAuth0 } from "@auth0/auth0-react";
import { IoLogoGoogle } from "react-icons/io";
import { router } from '../route/route';
import { useNavigate } from 'react-router-dom';

function Login() {
    const dispatch = useDispatch();
    const { loginWithRedirect, user, isAuthenticated, isLoading: authLoading, logout } = useAuth0();
    const [loginUser] = useLoginUserMutation();
    const [ passwordError, setPasswordError ] = useState('');

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isAuthenticated && user) {
            const auth0UserToSave = {
                id: user.sub,
                email: user.email,
                name: user.name || user.nickname,
                picture: user.picture,
                isAuthenticatedWithAuth0: true
            };
            dispatch(saveUser(auth0UserToSave));
        } else if (!isAuthenticated && !authLoading) {
            const currentUserInRedux = localStorage.getItem('user');
            if (currentUserInRedux) {
                try {
                    const parsedUser = JSON.parse(currentUserInRedux);
                    if (parsedUser.isAuthenticatedWithAuth0) {
                        dispatch(removeUser());
                    }
                } catch {
                    dispatch(removeUser());
                }
            }
        }
    }, [isAuthenticated, user, authLoading, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(loginData);
            console.log("login response: ", response);
            if(response.error?.data?.message === "Incorrect Password") {
                setPasswordError("Incorrect Password");
            }
            if (response.data?.statusCode === 200) {
                const userToSave = response.data.data?.user;
                if (userToSave) {
                    dispatch(saveUser({ ...userToSave, isAuthenticatedWithAuth0: false }));
                    alert("Login Successful");
                    navigate('/');
                } else {
                    alert("Login Successful, but user data incomplete.");
                }

            } else {
                // alert(`Login Failed: ${response.error?.data?.message || 'Unknown error'}`);
                console.error("Login Error: ", response.error);
            }
        } catch (error) {
            alert(`Login Error: ${error.message || 'Network error'}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-purple-100 to-purple-200 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Sign In</h2>

                {isAuthenticated ? (
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-lg font-semibold text-green-700">Welcome, {user.name || user.email}</p>
                        {user.picture && <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full shadow" />}
                        <button
                            onClick={() => logout({ returnTo: window.location.origin })}
                            className="mt-4 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition"
                        >
                            Login
                        </button>

                        <div className="text-center text-gray-500 text-sm">or</div>

                        <button
                            type="button"
                            onClick={() =>
                                loginWithRedirect({
                                    connection: "google-oauth2",
                                    prompt: "select_account"
                                })
                            }
                            className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:shadow-md transition"
                        >
                            <IoLogoGoogle size={20} />
                            <span className="font-medium">Sign in with Google</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;