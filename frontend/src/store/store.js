
import { configureStore } from '@reduxjs/toolkit' 
import productReducer from '../services/product/productApi'
import cartReducer from '../slice/cartSlice'
import userReducer from '../services/user/userApi'
import userrReducer from '../slice/userSlice'

export const store = configureStore({
    reducer: {
        product: cartReducer,
        user: userrReducer,
        [productReducer.reducerPath] : productReducer.reducer,
        [userReducer.reducerPath]: userReducer.reducer 
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productReducer.middleware, userReducer.middleware) 

})