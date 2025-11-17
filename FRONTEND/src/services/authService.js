import api from "./api";
import { API_ENDPOINTS } from "../constants";
import { config } from "../config/env";

// Email/Password Authentication
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    return response.data;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    });
    return response.data;
  },
};

// Google OAuth
export const googleAuthService = {
  // Handle Google login
  loginWithGoogle: async (credential) => {
    const response = await api.post(API_ENDPOINTS.AUTH.GOOGLE, { credential });
    return response.data;
  },
};

// GitHub OAuth
export const githubAuthService = {
  // Get GitHub OAuth URL
  getGithubAuthUrl: () => {
    const params = new URLSearchParams({
      client_id: config.githubClientId,
      redirect_uri: config.githubRedirectUri,
      scope: "user:email",
    });
    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  },

  // Handle GitHub callback
  handleGithubCallback: async (code) => {
    const response = await api.post(API_ENDPOINTS.AUTH.GITHUB_CALLBACK, {
      code,
    });
    return response.data;
  },
};

export default {
  ...authService,
  ...googleAuthService,
  ...githubAuthService,
};
