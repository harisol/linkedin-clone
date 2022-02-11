import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export default configureStore({
    reducer: {
        r_user: userReducer
    }
});