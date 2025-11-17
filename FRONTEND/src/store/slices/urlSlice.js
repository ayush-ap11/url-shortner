import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import urlService from "../../services/urlService";

// Initial state
const initialState = {
  urls: [],
  currentUrl: null,
  analytics: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

// Async thunks
export const createUrl = createAsyncThunk(
  "url/create",
  async (urlData, { rejectWithValue }) => {
    try {
      const data = await urlService.createUrl(urlData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create URL"
      );
    }
  }
);

export const fetchUrls = createAsyncThunk(
  "url/fetchAll",
  async (params, { rejectWithValue }) => {
    try {
      const data = await urlService.getUrls(params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch URLs"
      );
    }
  }
);

export const fetchUrlById = createAsyncThunk(
  "url/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await urlService.getUrlById(id);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch URL"
      );
    }
  }
);

export const updateUrl = createAsyncThunk(
  "url/update",
  async ({ id, urlData }, { rejectWithValue }) => {
    try {
      const data = await urlService.updateUrl(id, urlData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update URL"
      );
    }
  }
);

export const deleteUrl = createAsyncThunk(
  "url/delete",
  async (id, { rejectWithValue }) => {
    try {
      await urlService.deleteUrl(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete URL"
      );
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "url/fetchAnalytics",
  async ({ id, params }, { rejectWithValue }) => {
    try {
      const data = await urlService.getAnalytics(id, params);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch analytics"
      );
    }
  }
);

// URL slice
const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUrl: (state) => {
      state.currentUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create URL
      .addCase(createUrl.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urls.unshift(action.payload.url);
        state.error = null;
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch URLs
      .addCase(fetchUrls.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.urls = action.payload.urls;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch URL by ID
      .addCase(fetchUrlById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUrlById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUrl = action.payload.url;
        state.error = null;
      })
      .addCase(fetchUrlById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update URL
      .addCase(updateUrl.fulfilled, (state, action) => {
        const index = state.urls.findIndex(
          (url) => url._id === action.payload.url._id
        );
        if (index !== -1) {
          state.urls[index] = action.payload.url;
        }
        state.currentUrl = action.payload.url;
      })
      // Delete URL
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.urls = state.urls.filter((url) => url._id !== action.payload);
        if (state.currentUrl?._id === action.payload) {
          state.currentUrl = null;
        }
      })
      // Fetch Analytics
      .addCase(fetchAnalytics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload.analytics;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentUrl } = urlSlice.actions;
export default urlSlice.reducer;
