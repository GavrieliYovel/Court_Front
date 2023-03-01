import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userID: null,
        name: null,
        email: null
    },
    reducers: {
        getUser: (state, action) => {
            state.userID = action.payload.userID;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        editUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
    },
});

export const { getUser, editUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;
