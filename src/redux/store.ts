import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import signupSlice from "./slices/signupSlice";
import loginSlice from "./slices/loginSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    signup:signupSlice,
    login:loginSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
