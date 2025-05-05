
import React, { useState } from 'react'
import { useLoginUserMutation } from '../services/user/userApi';
import { useDispatch } from 'react-redux';
import { saveUser } from '../slice/userSlice';

function Login() {
    const [ loginUser, {error, isLoading} ] = useLoginUserMutation();
    let [loginData, setLoginData] = useState({
        email: '',
        password: ''   
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginData({...loginData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login data: ", loginData);

        try {
            const response = await loginUser(loginData);
            console.log("login user response ", response);

            if(response.data.statusCode === 200) {
                dispatch(saveUser(response?.data.data[0]))
                alert("Login Successfull ");
            }

        } catch (error) {
            console.log("error occured while login ", error.message);
        }
    }

  return (
    <div className='h-[70vh] flex flex-col justify-center items-center gap-[2rem]'>
        <h1 className='text-[2rem] text-purple-700 font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]'>
            <div className='grid grid-cols-[6vw_15vw]'>
                <label htmlFor="email"><span className='text-[1rem] font-semibold'>email:</span> </label>
                <input type="text" id='email' name='email' value={loginData.email} onChange={handleChange} className="px-[1.5rem] py-[0.2rem] bg-gray-200"/>
            </div>
            <div className='grid grid-cols-[6vw_15vw]'>
                <label htmlFor="password"><span className='text-[1rem] font-semibold'>password:</span>
                     </label>
                <input type="text" id='password' name='password' value={loginData.password} onChange={handleChange} className="px-[1.5rem] py-[0.2rem] bg-gray-200"/> 
            </div>
            <div className='flex justify-center'>
                <button type="submit" className='px-[1rem] py-[0.3rem] bg-purple-600 font-semibold text-white text-center'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login