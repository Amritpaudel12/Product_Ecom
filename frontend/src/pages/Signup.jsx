
import React, { useState } from 'react'
import { useRegisterUserMutation } from '../services/user/userApi';

function Signup() {
    const [ registerUser, { error, isLoading } ] = useRegisterUserMutation();

    let [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: ''   
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSignupData({...signupData, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("signup data: ", signupData);
        
        try {
            const response = await registerUser(signupData);
            console.log("response: ", response);
            if(response.data.statusCode === 200)
            {
                alert("User Registered Successfully");
            }
        } catch (error) {
            console.log("error occured while signup data: ", error.message);
        }

    }

  return (
    <div className='h-[70vh] flex flex-col justify-center items-center gap-[2rem]'>
        <h1 className='text-[2rem] text-purple-700 font-bold'>Signup</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-[1rem]'>
            <div className='grid grid-cols-[6vw_15vw]'>
                <label htmlFor="username"><span className='text-[1rem] font-semibold'>username:</span> </label>
                <input type="text" id='username' name='username' value={signupData.username} onChange={handleChange} className="px-[1.5rem] py-[0.2rem] bg-gray-200"/>
            </div>
            <div className='grid grid-cols-[6vw_15vw]'>
                <label htmlFor="email"><span className='text-[1rem] font-semibold'>email:</span> </label>
                <input type="text" id='email' name='email' value={signupData.email} onChange={handleChange} className="px-[1.5rem] py-[0.2rem] bg-gray-200"/>
            </div>
            <div className='grid grid-cols-[6vw_15vw]'>
                <label htmlFor="password"><span className='text-[1rem] font-semibold'>password:</span>
                     </label>
                <input type="text" id='password' name='password' value={signupData.password} onChange={handleChange} className="px-[1.5rem] py-[0.2rem] bg-gray-200"/> 
            </div>
            <div className='flex justify-center'>
                <button type="submit" className='px-[1rem] py-[0.3rem] bg-purple-600 font-semibold text-white text-center'>Signup</button>
            </div>
        </form>
    </div>
  )
}

export default Signup