import { urlProp, urlState, urlType, urlEditType, slugState } from "@/constants/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: slugState = {
  isLoading: false,
  isError: false,
  slug:""
};

export const autoGenerateUrlSlug = createAsyncThunk(
  "url/autoGenerateUrlSlug",
  async (_, { rejectWithValue }) => {
    try {
      console.log("i'm here in autogen in Slice");

      const response = await AxiosInstance.get("/url/slug");
      console.log(response);
      if (response.status === 400) {
        toast.error("Error generating slug");
        throw new Error("Error generating URLs");
      }
console.log("response.data.slug");
console.log(response.data.slug);
    return response.data.slug;
      
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const autoSlugSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(autoGenerateUrlSlug.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(autoGenerateUrlSlug.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        console.log(action.payload);
        state.slug = action.payload;
      })
      .addCase(autoGenerateUrlSlug.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
     
  },
});

export default autoSlugSlice.reducer;
