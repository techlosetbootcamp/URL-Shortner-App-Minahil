import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { LOGIN_STATE } from "@/types/types";

const initialState: LOGIN_STATE = {
  loginStatus: "idle",
  error: null,
  userDetails: null,
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (response?.ok) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response?.error);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginDetails: (state) => {
      state.loginStatus = "idle";
      state.error = null;
      state.userDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userDetails = action.payload;
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearLoginDetails } = loginSlice.actions;
export default loginSlice.reducer;
