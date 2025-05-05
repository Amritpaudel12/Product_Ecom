
import { createSlice } from '@reduxjs/toolkit'

const getUser = () => {
    let user = localStorage.getItem('user');
    if(!user) {
        return null;
    }

    const actualUser = JSON.parse(user);

    return actualUser;
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
            // state.user.push(action.payload);
        },
        removeUser: (state,action) => {
            localStorage.removeItem('user');
            state.user = '';
        }
    }
})

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;