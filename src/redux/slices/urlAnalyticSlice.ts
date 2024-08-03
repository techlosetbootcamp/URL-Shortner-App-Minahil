import { URL_ANALYTIC_PROPS, URL_ANALYTIC_STATE } from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: URL_ANALYTIC_STATE = {
  isLoading: false,
  isError: false,
  urlAnalytic: {
    analytic: { clicked: 0 },
  },
};

export const getUrlAnalytic = createAsyncThunk(
  "urlAnalytic/getUrlAnalytic",
  async ({ code }: URL_ANALYTIC_PROPS, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/analytic/${code}`);

      if (response?.data) {
        const urlAnalytic = {
          id: response.data.analytic.id,
          url: response.data.analytic.url,
          url_id: response.data.analytic.url_id,
          clicked: response.data.analytic.clicked,
          updatedAt: response.data.analytic.updatedAt,
        };

        return urlAnalytic;
      } else {
        throw new Error("Url Analytics data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const urlAnalyticSlice = createSlice({
  name: "urlAnalytic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUrlAnalytic.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUrlAnalytic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urlAnalytic.analytic = action.payload;
      })
      .addCase(getUrlAnalytic.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default urlAnalyticSlice.reducer;
