
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

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path:'/',
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
                path:'/single-products/:id',
                element: <SingleProducts />
            },
            {
                path:'/cart',
                element: <Cart />
            },
            {
                path:'/signup',
                element:<Signup />
            },
            {
                path:'/login',
                element:<Login />
            }
        ]
    }
])

export { router }