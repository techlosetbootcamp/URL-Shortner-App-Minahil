import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import signupSlice from "./slices/signupSlice";
import loginSlice from "./slices/loginSlice";
import passwordSlice from "./slices/passwordSlice";
import urlSlice from "./slices/urlSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    signup:signupSlice,
    login:loginSlice,
    password:passwordSlice,
    url:urlSlice
    //verifytoken:verifyTokenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
