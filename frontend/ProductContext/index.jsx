import { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const cartItems = useSelector((state) => state.product.product);

    useEffect(() => {
        setCartCount(cartItems.length);
    }, [cartItems]);

    return (
        <ProductContext.Provider value={{ cartCount }}>
            {children}
        </ProductContext.Provider>
    );
};
