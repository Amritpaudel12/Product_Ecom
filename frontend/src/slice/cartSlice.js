
import { createSlice } from "@reduxjs/toolkit";

export const getUserCart = (userEmail) => {
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
                const existing = state.product.find(p => p.id === action.payload.id);
                if (existing) {
                    existing.quantity = (existing.quantity || 1) + 1;
                } else {
                    state.product.push({ ...action.payload, quantity: 1 });
                }
                saveUserCart(state.userEmail, state.product);
            }
        },

        removeFromCart: (state, action) => {
            if (state.userEmail) {
                const index = state.product.findIndex(p => p.id === action.payload.productId);
                if (index !== -1) {
                    if (state.product[index].quantity > 1) {
                        state.product[index].quantity -= 1;
                    } else {
                        state.product.splice(index, 1); 
                    }
                    saveUserCart(state.userEmail, state.product);
                }
            }
        },

        removeItemFromCart: (state, action) => {
            if (state.userEmail) {
                state.product = state.product.filter(p => p.id !== action.payload.productId);
                saveUserCart(state.userEmail, state.product);
            }
        },

        incrementQuantity: (state, action) => {
            if (state.userEmail) {
                const item = state.product.find(p => p.id === action.payload.productId);
                if (item) {
                    item.quantity += 1;
                    saveUserCart(state.userEmail, state.product);
                }
            }
        },

        decrementQuantity: (state, action) => {
            if (state.userEmail) {
                const item = state.product.find(p => p.id === action.payload.productId);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    saveUserCart(state.userEmail, state.product);
                } else if (item && item.quantity === 1) {
                    state.product = state.product.filter(p => p.id !== action.payload.productId);
                    saveUserCart(state.userEmail, state.product);
                }
            }
        },

        clearCart: (state) => {
            if (state.userEmail) {
                const allCarts = JSON.parse(localStorage.getItem('userCarts')) || {};
                if (allCarts[state.userEmail]) {
                    allCarts[state.userEmail].product = [];
                    localStorage.setItem('userCarts', JSON.stringify(allCarts));
                }
            }
            state.product = [];
        }
    }
});

export const {
    addToCart,
    removeFromCart, 
    removeItemFromCart, 
    incrementQuantity,
    decrementQuantity,
    clearCart,
    initializeUserCart
} = productSlice.actions;

export default productSlice.reducer;