import {
  urlProp,
  urlState,
  urlType,
  urlEditType,
} from "@/constants/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: urlState = {
  isLoading: false,
  isError: false,
  url: {},
  urls: [],
};

export const shortenUrl = createAsyncThunk(
  "url/shortenUrl",
  async ({ url }: urlProp, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/url", { url });

      if (response.status === 400) {
        toast.error("Invalid URL");
        throw new Error("Invalid URL");
      }

      if (response?.data) {
        const urlData = {
          id: response.data.result.id,
          originalUrl: response.data.result.originalUrl,
          shortUrl: response.data.result.shortUrl,
          qrCode: response.data.result.qrCode,
          urlCode: response.data.result.urlCode,
          active: response.data.result.active,
          user: response.data.user,
        };
        toast.success("Url shortened successfully");
        return urlData;
      } else {
        throw new Error("Url data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const shortenUrlWithCustomSlug = createAsyncThunk(
  "url/shortenUrlWithCustomSlug",
  async ({ url, customSlug }: urlProp, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/url/custom", {
        url,
        customSlug,
      });

      if (response.status === 400) {
        toast.error("Invalid URL");
        throw new Error("Invalid URL");
      }

      if (response?.data) {
        const urlData = {
          id: response.data.result.id,
          originalUrl: response.data.result.originalUrl,
          shortUrl: response.data.result.shortUrl,
          qrCode: response.data.result.qrCode,
          urlCode: response.data.result.urlCode,
          active: response.data.result.active,
          user: response.data.user,
        };
        toast.success("Url shortened successfully");
        return urlData;
      } else {
        throw new Error("Url data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUrl = createAsyncThunk(
  "url/editUrl",
  async ({ urlCode, newUrlCode }: urlEditType, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.patch(`/url/${urlCode}`, {
        newUrlCode,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "url/deleteUrl",
  async ({ urlCode }: urlEditType, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.delete(`/url/${urlCode}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUrls = createAsyncThunk(
  "url/getUrls",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/url");
      if (response.status === 400) {
        toast.error("Error fetching URLs");
        throw new Error("Error fetching URLs");
      }

      if (response?.data) {
        const urls = response.data.result.map((url: any) => ({
          id: url.id,
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl,
          qrCode: url.qrCode,
          urlCode: url.urlCode,
          active: url.active,
          user_email: url.user_email ? url.user_email : null,
        }));

        const urlsWithAnalytics: urlType[] = await Promise.all(
          urls.map(async (url: urlType) => {
            const code = url?.urlCode;
            const analyticResponse = await AxiosInstance.get(
              `/analytic/${code}`
            );
            return { ...url, analytics: analyticResponse.data };
          })
        );
        return urlsWithAnalytics;
      } else {
        throw new Error("URLs data not found");
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
      const response = await AxiosInstance.patch("/url/status", { urlCode });
      const updatedUrl = response.data.updatedUrl;
      const code = urlCode;
      const analyticResponse = await AxiosInstance.get(`/analytic/${code}`);
      updatedUrl.analytics = analyticResponse.data;

      return updatedUrl;
    } catch (error: any) {
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
      .addCase(shortenUrl.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.url = action.payload;
      })
      .addCase(shortenUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUrls.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUrls.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.urls = action.payload;
      })
      .addCase(getUrls.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(toggleUrlStatus.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(toggleUrlStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const updatedUrl: urlType = action.payload;

        state.urls = state.urls?.map((url) =>
          url.urlCode === updatedUrl?.urlCode
            ? {
                ...url,
                ...updatedUrl,
                analytics: updatedUrl?.analytics ?? url.analytics,
              }
            : url
        );

        if (state.url.urlCode === updatedUrl.urlCode) {
          state.url = {
            ...state.url,
            ...updatedUrl,
            analytics: updatedUrl.analytics ?? state.url.analytics,
          };
        }
      })
      .addCase(toggleUrlStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editUrl.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(editUrl.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const updatedUrl = action.payload;
        state.urls = state.urls?.map((url) =>
          url.urlCode === updatedUrl.urlCode ? { ...url, ...updatedUrl } : url
        );
        if (state.url.urlCode === updatedUrl.urlCode) {
          state.url = { ...state.url, ...updatedUrl };
        }
      })
      .addCase(editUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUrl.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        const updatedUrl = action.payload;
        state.urls = state.urls?.map((url) =>
          url.urlCode === updatedUrl.urlCode ? { ...url, ...updatedUrl } : url
        );
        if (state.url.urlCode === updatedUrl.urlCode) {
          state.url = { ...state.url, ...updatedUrl };
        }
      })
      .addCase(deleteUrl.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default urlSlice.reducer;
