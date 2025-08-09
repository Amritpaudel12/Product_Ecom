import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 

const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/user',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user 
            })
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            })
        }),
        getAllUsers: builder.query({ 
            query: () => '/all',
        }),
        createContact: builder.mutation({
            query: (contact) => ({
                url: '/contact/create',
                method: 'POST',
                body: contact
            })
        })
    })
})

export const { 
    useRegisterUserMutation, 
    useLoginUserMutation, 
    useLogoutUserMutation,
    useGetAllUsersQuery,
    useCreateContactMutation
} = userApi;

export default userApi;