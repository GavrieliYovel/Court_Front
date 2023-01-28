import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userID: null,
        name: null
    },
    reducers: {
        getUser: (state, action) => {
            state.userID = action.payload.userID;
            state.name = action.payload.name;
        }
    }
});

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice;
