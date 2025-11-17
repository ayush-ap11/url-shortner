import api from "./api";
import { API_ENDPOINTS } from "../constants";

export const urlService = {
  // Create short URL
  createUrl: async (urlData) => {
    const response = await api.post(API_ENDPOINTS.URLS.CREATE, urlData);
    return response.data;
  },

  // Get all user URLs
  getUrls: async (params) => {
    const response = await api.get(API_ENDPOINTS.URLS.LIST, { params });
    return response.data;
  },

  // Get single URL by ID
  getUrlById: async (id) => {
    const response = await api.get(API_ENDPOINTS.URLS.GET(id));
    return response.data;
  },

  // Update URL
  updateUrl: async (id, urlData) => {
    const response = await api.put(API_ENDPOINTS.URLS.UPDATE(id), urlData);
    return response.data;
  },

  // Delete URL
  deleteUrl: async (id) => {
    const response = await api.delete(API_ENDPOINTS.URLS.DELETE(id));
    return response.data;
  },

  // Get URL analytics
  getAnalytics: async (id, params) => {
    const response = await api.get(API_ENDPOINTS.URLS.ANALYTICS(id), {
      params,
    });
    return response.data;
  },
};

export default urlService;
