import { createSlice } from '@reduxjs/toolkit';

const getUser = () => {
    let userString = localStorage.getItem('user');

    if (userString === null) {
        return null;
    }

    try {
        const actualUser = JSON.parse(userString);
        return actualUser;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        console.error("Value that caused error:", userString);
        return null;
    }
}

const initialState = {
    user: getUser()
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            const user = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        removeUser: (state) => {
            localStorage.removeItem('user');
            state.user = null;
        }
    }
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;