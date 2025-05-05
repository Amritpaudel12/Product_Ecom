

import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    product: [] 
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers : {
        addToCart: (state, action) => {
            state.product.push(action.payload);
        },
        removeFromCart: (state,action) => {
            console.log("action payload ",action.payload)
            state.product = state.product.filter((item,ind)=> item.id !== action.payload.productId);
        }
    }
})

export const { addToCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;