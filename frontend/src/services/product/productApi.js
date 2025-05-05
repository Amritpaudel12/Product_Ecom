
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'  

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/product',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createProduct:  builder.mutation({
            query: (product) => ({
                url: '/create-product',
                method: 'POST',
                body: product 
            })
        }),

        getProducts: builder.query({
            query: () => ({ 
                url: '/products',
                method: 'GET'
            })
        }),

        getSpecificProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET'
            })
        }),

        updateProduct: builder.mutation({
            query: ({id, product}) => ({
                url:`/product/update/${id}`,
                method: 'PUT',
                body: product 
            })
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/delete/${id}`,
                method: 'DELETE' 
            })
        })
    })
})

export const { useCreateProductMutation, useGetProductsQuery, useGetSpecificProductQuery, useUpdateProductMutation, useDeleteProductMutation } = productApi;

export default productApi;