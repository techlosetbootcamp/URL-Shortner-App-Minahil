import { urlProp, urlState } from "@/constants/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState: urlState = {
  isLoading: false,
  isError: false,
  url: {},
};

export const getUrlDetails = createAsyncThunk(
  "url/getUrlDetails",
  async ({ url }: urlProp, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/url",{url});

      if(response.status===400){
        toast.error("Invalid URL");
        throw new Error("Invalid URL");
      }
      console.log("hello to urlApi");
      console.log(response.data);
      if (response?.data) {
        const url = {
          id:response.data.result.id,
          originalUrl: response.data.result.originalUrl,
          shortUrl: response.data.result.shortUrl,
          qrCode: response.data.result.qrCode,
          urlCode: response.data.result.urlCode,
        };
        toast.success("Url shortened Successfully");
        return url;
      } else {
        throw new Error("Url data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const editUser = createAsyncThunk(
//   "user/editUser",
//   async ({ name,email,newEmail }: userType, { rejectWithValue }) => {
//     try {
//       const response = await AxiosInstance.patch("/user/edit", { name,email,newEmail});
//       if(response.status==200){
//         toast.success("Profile Updated");
//       }
      
//       if(response.status==400){
//         console.log("Hello");
//         toast.error("This email is already registered");
//       }
//       if(response.status==401){
//         toast.error("Please fill all feilds");
//       }
//       return response.data;
//       }
//      catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUrlDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUrlDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.url = action.payload;
        console.log(state.url);
      })
      .addCase(getUrlDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
    //   .addCase(editUser.pending, (state) => {
    //     state.isError = false;
    //     state.isLoading = true;
    //   })
    //   .addCase(editUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload;
    //     console.log(state.user);
    //   })
    //   .addCase(editUser.rejected, (state) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //   });
  },
});

export default urlSlice.reducer;
