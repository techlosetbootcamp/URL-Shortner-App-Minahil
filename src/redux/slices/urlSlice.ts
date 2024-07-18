import { urlProp, urlState, urlType } from "@/constants/types/types";
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
          active: response.data.result.active,
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

export const toggleUrlStatus = createAsyncThunk(
  "url/toggleUrlStatus",
  async ({ urlCode }: urlType, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch("/url/status",{urlCode}); 
      return response.data.updatedUrl;
      }
     catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
        const updatedUrl = action.payload;
        state.isError=false;
        state.isLoading = false;
        state.url = action.payload;
        console.log("state.url");
        console.log(state.url);
      })
      .addCase(getUrlDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(toggleUrlStatus.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(toggleUrlStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError=false;
        console.log("action.payload.active");
        console.log(action.payload.active);
        state.url = { ...state.url, active: action.payload.active };
      })
      .addCase(toggleUrlStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default urlSlice.reducer;
