import { SLUG_STATE } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: SLUG_STATE = {
  isLoading: false,
  isError: false,
  slug: "",
};

export const autoGenerateUrlSlug = createAsyncThunk(
  "url/autoGenerateUrlSlug",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/url/slug");
      if (response.status === 400) {
        toast.error("Error generating slug");
        throw new Error("Error generating URLs");
      }

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
        state.slug = action.payload;
      })
      .addCase(autoGenerateUrlSlug.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default autoSlugSlice.reducer;
