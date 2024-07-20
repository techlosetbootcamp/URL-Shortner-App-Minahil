import { urlAnalyticProp, urlAnalyticState, urlProp } from "@/constants/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: urlAnalyticState = {
  isLoading: false,
  isError: false,
  urlAnalytic: {
    analytic:{clicked:0}
  },
};

export const getUrlAnalytic = createAsyncThunk(
  "urlAnalytic/getUrlAnalytic",
  async ({ code }: urlAnalyticProp, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/analytic/${code}`);
      console.log("hello to urlAnalyticApi");
      console.log(response.data);
      if (response?.data) {
        const urlAnalytic = {
          id:response.data.analytic.id,
          url: response.data.analytic.url,
          url_id: response.data.analytic.url_id,
          clicked: response.data.analytic.clicked,
          updatedAt: response.data.analytic.updatedAt
        };
        console.log("urlAnalytic");
        console.log(urlAnalytic);
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
        console.log(state.urlAnalytic);
      })
      .addCase(getUrlAnalytic.rejected, (state) => {
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

export default urlAnalyticSlice.reducer;
