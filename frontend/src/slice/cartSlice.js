
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: JSON.parse(localStorage.getItem('cart'))?.product || []
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.product.push(action.payload);
            localStorage.setItem('cart', JSON.stringify({ product: state.product }));
        },
        removeFromCart: (state, action) => {
            state.product = state.product.filter(item => item.id !== action.payload.productId);
            localStorage.setItem('cart', JSON.stringify({ product: state.product }));
        }
    }
});

export const { addToCart, removeFromCart } = productSlice.actions;
export default productSlice.reducer;
