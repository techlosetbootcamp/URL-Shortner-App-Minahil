import { userState } from "@/constants/types/userType";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: userState = {
  isLoading: false,
  isError: false,
  user:
  {name: "",
  email: "",
  password: "",}
};
export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/user", {
        params: { userId },
      });
      if (response?.data) {
        const user = {
          name:response.data.user.name,
          email: response.data.user.email,
          password: response.data.user.password,
        };
        return user;
      } else {
        throw new Error("User data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;