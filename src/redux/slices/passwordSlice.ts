import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { PASSWORD_PROPS, PASSWORD_STATE } from "@/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";

const initialState: PASSWORD_STATE = {
  isLoading: false,
  isError: null,
  passwordStatus: "idle",
};

export const changePassword = createAsyncThunk(
  "changePassword/ChangePassword",
  async ({ password, email }: PASSWORD_PROPS, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch("/password/change", {
        password,
        email,
      });

      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword/ResetPassword",
  async ({ password, email }: PASSWORD_PROPS, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/password/reset", {
        password,
        email,
      });
      toast.success("Password has been reset Successfully!");
      return response.data;
    } catch (error: any) {
      toast.error("Something Went wrong, try again");
      return rejectWithValue(error.response.data);
    }
  }
);

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.passwordStatus = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.passwordStatus = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.passwordStatus = "failed";
      })
      .addCase(changePassword.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.passwordStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.passwordStatus = "succeeded";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.passwordStatus = "failed";
      });
  },
});

export default passwordSlice.reducer;
