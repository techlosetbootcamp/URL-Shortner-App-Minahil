import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import signupSlice from "./slices/signupSlice";
import loginSlice from "./slices/loginSlice";
import passwordSlice from "./slices/passwordSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    signup:signupSlice,
    login:loginSlice,
    password:passwordSlice,
    //verifytoken:verifyTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
