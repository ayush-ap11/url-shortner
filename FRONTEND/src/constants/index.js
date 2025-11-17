// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    GOOGLE: "/auth/google",
    GITHUB: "/auth/github",
    GITHUB_CALLBACK: "/auth/github/callback",
  },

  // URL endpoints
  URLS: {
    CREATE: "/urls",
    LIST: "/urls",
    GET: (id) => `/urls/${id}`,
    UPDATE: (id) => `/urls/${id}`,
    DELETE: (id) => `/urls/${id}`,
    ANALYTICS: (id) => `/urls/${id}/analytics`,
  },

  // User endpoints
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/profile",
    DELETE: "/user/profile",
  },
};

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
};

// Auth providers
export const AUTH_PROVIDERS = {
  EMAIL: "email",
  GOOGLE: "google",
  GITHUB: "github",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  PRICING: "/pricing",
  CONTACT: "/contact",
  GITHUB_CALLBACK: "/auth/github/callback",
};
