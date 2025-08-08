
import { createBrowserRouter } from 'react-router-dom'
// import Navbar from '../components/Navbar/Navbar'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Product from '../pages/Product'
import App from '../App'
import Categories from '../components/Category/Categories'
import SingleProducts from '../pages/SingleProducts'
import Cart from '../pages/Cart'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import AdminLogin from '../pages/AdminLogin'
import AdminProtect from '../components/AdminProtect'
import Dashboard from '../components/Admin/Dashboard'
import GetProducts from '../components/Admin/GetProducts'
import Settings from '../components/Admin/Settings'
import Users from '../components/Admin/Users'
import Admin from '../components/Admin/Admin'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/products',
                element: <Product />
            },
            {
                path: '/categories/:Category',
                element: <Categories />
            },
            {
                path: '/single-products/:id',
                element: <SingleProducts />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminProtect><AdminLogin /></AdminProtect>
    },
    {
        path: '/admin/dashboard',
        element: <AdminProtect><Dashboard /></AdminProtect>
    },
    {
        path: '/admin/products',
        element: <AdminProtect><GetProducts /></AdminProtect>
    },
    {
        path: '/admin/settings',
        element: <AdminProtect><Settings /></AdminProtect>
    },
    {
        path: '/admin/users',
        element: <AdminProtect><Users /></AdminProtect>
    },
    {
        path: '/admin/search',
        element: <AdminProtect><Admin /></AdminProtect>
    }
])

export { router }