
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeUser } from '../../slice/userSlice';
import { useLogoutUserMutation } from '../../services/user/userApi';

const sections = [
    {
        path:'/',
        name:'Home'
    },
    {
        path:'/about',
        name:'About'
    },
    {
        path:'/contact',
        name:'Contact'
    },
    {
        path:'/products',
        name:'Product'
    },
    {
        path:'/cart',
        name:'Cart'
    },
]

function Navbar() {
    let user = useSelector(state => state.user);
    user = user.user;
    console.log("user data ", user);

    const [ logoutUser, {error, isLoading} ] = useLogoutUserMutation();

    const dispatch = useDispatch();

    const handleLogout = async () => {
        dispatch(removeUser());
        try {
            const response = await logoutUser();
            console.log("logout response ", response);
        } catch (error) {
            console.log("error occured while logout ", error.message);
        }
    }
  return (
    <nav className='h-[10vh] flex justify-around items-center bg-[#007BFF] text-white sticky top-0'> {/* #C70039 */}
        <div>
            <h1 className='font-bold text-2xl'>Product_Ecom</h1>
        </div>
        <ul className='flex gap-[1rem]'>
            {sections.map((section, index) => {
                return <Link to={section.path} key={index}>
                    <li className='font-semibold'>{section.name}</li>
                </Link>
            })}
            {
                user && <button onClick={handleLogout} className='px-[1rem] py-[0.2rem] bg-purple-600 font-bold text-white'>logout</button>
            }
            {
                !user && <div className='flex gap-[0.3rem]'>
                    <button>
                        <Link to='/signup' className='px-[1rem] py-[0.2rem] bg-purple-600 font-bold text-white'>Signup</Link>
                    </button>
                    <button>
                        <Link to='/login' className='px-[1rem] py-[0.2rem] bg-purple-600 font-bold text-white'>Login</Link> 
                    </button>
                </div>
                
            }
        </ul>
    </nav>
  )
}

export default Navbar