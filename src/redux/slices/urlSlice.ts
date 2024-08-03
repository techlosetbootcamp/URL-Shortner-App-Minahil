import {
  URL_PROPS,
  URL_STATE,
  URL_TYPE,
  URL_EDIT_TYPE,
} from "@/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState: URL_STATE = {
  isLoading: false,
  isError: false,
  url: {},
  urls: [],
};

export const shortenUrl = createAsyncThunk(
  "url/shortenUrl",
  async ({ url }: URL_PROPS, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/url", { url });

      if (response.status === 400) {
        toast.error("Invalid URL");
        throw new Error("Invalid URL");
      }

      if (response?.data) {
        const urlData = {
          id: response.data.result.id,
          originalUrl: response.data.result.originalUrl,
          iconImg: response.data.result.iconImg,
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
  async ({ url, customSlug }: URL_PROPS, { rejectWithValue }) => {
    try {
      const response = await axios.post("api/url/custom", {
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
          iconImg: response.data.result.iconImg,
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
  async ({ urlCode, newUrlCode }: URL_EDIT_TYPE, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`api/url/${urlCode}`, {
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
  async ({ urlCode }: URL_EDIT_TYPE, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`api/url/${urlCode}`);
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
      const response = await axios.get("api/url");
      if (response.status === 400) {
        toast.error("Error fetching URLs");
        throw new Error("Error fetching URLs");
      }

      if (response?.data) {
        const urls = response.data.result.map((url: any) => ({
          id: url.id,
          originalUrl: url.originalUrl,
          iconImg: url.iconImg,
          shortUrl: url.shortUrl,
          qrCode: url.qrCode,
          urlCode: url.urlCode,
          active: url.active,
          user_email: url.user_email ? url.user_email : null,
        }));

        const urlsWithAnalytics: URL_TYPE[] = await Promise.all(
          urls.map(async (url: URL_TYPE) => {
            const code = url?.urlCode;
            const analyticResponse = await axios.get(
              `api/analytic/${code}`
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
  async ({ urlCode }: URL_TYPE, { rejectWithValue }) => {
    try {
      const response = await axios.patch("api/url/status", { urlCode });
      const updatedUrl = response.data.updatedUrl;
      const code = urlCode;
      const analyticResponse = await axios.get(`api/analytic/${code}`);
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
        const updatedUrl: URL_TYPE = action.payload;

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
