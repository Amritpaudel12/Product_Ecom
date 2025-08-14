import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { ProductProvider } from '../ProductContext/index.jsx';

function App({children}) {
    return (
    <ProductProvider>
      <Navbar />
      {children}
      <Outlet />
      <Footer />
    </ProductProvider>
  )
}

export default App