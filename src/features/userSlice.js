import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "s_user",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout } = userSlice.actions;

// selectors
export const selectUser = (state) => state.r_user.user;

export default userSlice.reducer;
