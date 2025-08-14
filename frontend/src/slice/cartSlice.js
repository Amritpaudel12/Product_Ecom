
import { createSlice } from "@reduxjs/toolkit";

const getUserCart = (userEmail) => {
    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    return allCarts[userEmail]?.product || [];
};

const saveUserCart = (userEmail, products) => {
    const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
    allCarts[userEmail] = { product: products };
    localStorage.setItem('userCarts', JSON.stringify(allCarts));
};

const initialState = {
    product: [],
    userEmail: null
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        initializeUserCart: (state, action) => {
            const userEmail = action.payload;
            state.userEmail = userEmail;
            state.product = getUserCart(userEmail);
        },
        addToCart: (state, action) => {
            if (state.userEmail) {
                state.product.push(action.payload);
                saveUserCart(state.userEmail, state.product);
            }
        },
        removeFromCart: (state, action) => {
            if (state.userEmail) {
                state.product = state.product.filter(item => item.id !== action.payload.productId);
                saveUserCart(state.userEmail, state.product);
            }
        },
        clearCart: (state) => {
            if (state.userEmail) {
                const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
                delete allCarts[state.userEmail];
                localStorage.setItem('userCarts', JSON.stringify(allCarts));
            }
            state.product = [];
            state.userEmail = null;
        }
    }
});

export const { addToCart, removeFromCart, clearCart, initializeUserCart } = productSlice.actions;
export default productSlice.reducer;
