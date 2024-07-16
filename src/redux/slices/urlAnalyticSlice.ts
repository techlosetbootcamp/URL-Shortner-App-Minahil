import { urlAnalyticProp, urlAnalyticState, urlProp } from "@/constants/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState: urlAnalyticState = {
  isLoading: false,
  isError: false,
  urlAnalytic: {
    clicked:0
  },
};

export const getUrlDetails = createAsyncThunk(
  "urlAnalytic/getUrlAnalytic",
  async ({ code }: urlAnalyticProp, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/analytic/${code}`);
      console.log("hello to urlAnalyticApi");
      console.log(response.data);
      if (response?.data) {
        const urlAnalytic = {
          id:response.data.result.id,
          url: response.data.result.url,
          url_id: response.data.result.url_id,
          clicked: response.data.result.clicked,
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
      .addCase(getUrlDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUrlDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urlAnalytic = action.payload;
        console.log(state.urlAnalytic);
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

export default urlAnalyticSlice.reducer;
