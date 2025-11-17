import api from "./api";
import { API_ENDPOINTS } from "../constants";

export const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put(API_ENDPOINTS.USER.UPDATE, userData);
    return response.data;
  },

  // Delete user account
  deleteAccount: async () => {
    const response = await api.delete(API_ENDPOINTS.USER.DELETE);
    return response.data;
  },
};

export default userService;
