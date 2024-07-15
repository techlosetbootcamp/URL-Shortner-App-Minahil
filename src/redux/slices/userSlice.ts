import { userState, userType } from "@/constants/types/userType";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: userState = {
  isLoading: false,
  isError: false,
  user: {id: "", name: "", email: "", password: "" },
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/user");
      console.log("hellohibyby");
      console.log(response.data.user);
      if (response?.data) {
        const user = {
          id:response.data.user.id,
          name: response.data.user.name,
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

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ name,email,newEmail }: userType, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch("/user/edit", { name,email,newEmail});
      if(response.status==200){
        toast.success("Profile Updated");
      }
      
      if(response.status==400){
        console.log("Hello");
        toast.error("This email is already registered");
      }
      if(response.status==401){
        toast.error("Please fill all feilds");
      }
      return response.data;
      }
     catch (error: any) {
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
        console.log(state.user);
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        console.log(state.user);
      })
      .addCase(editUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
