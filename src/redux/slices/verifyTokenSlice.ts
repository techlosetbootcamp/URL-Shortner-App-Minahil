import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { passwordProps, VerifyTokenState } from "@/constants/types/types";

const initialState: VerifyTokenState = {
  isLoading: false,
  isError: null,
  token: "",
  user:{
    name:""
  }
};

export const verifyToken = createAsyncThunk(
    "verifyToken/VerifyToken",
    async ({token}: passwordProps, { rejectWithValue }) => {
      try {
        const response = await AxiosInstance.post("/password/verifytoken", {token});
        console.log(response);
        toast.success("Token Verified!!");
        return response.data;
      } catch (error: any) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data);
      }
    }
  );

export const verifyTokenSlice = createSlice({
  name: "verifyToken",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.token = "loading";
        state.user.name="";
      })
      .addCase(verifyToken.fulfilled, (state,action) => {
        state.isError = null;
        state.isLoading = false;
        state.token = "succeeded";
        state.user=action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.token = "failed";
        state.user.name="";
      });
  },
});


export default verifyTokenSlice.reducer;