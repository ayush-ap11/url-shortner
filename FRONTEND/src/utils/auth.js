import Cookies from "js-cookie";
import { STORAGE_KEYS } from "../constants";

// Token management
export const tokenManager = {
  getAccessToken: () => {
    return (
      Cookies.get(STORAGE_KEYS.ACCESS_TOKEN) ||
      localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    );
  },

  setAccessToken: (token, rememberMe = false) => {
    if (rememberMe) {
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, { expires: 7 }); // 7 days
    } else {
      Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token); // Session cookie
    }
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getRefreshToken: () => {
    return (
      Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) ||
      localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    );
  },

  setRefreshToken: (token, rememberMe = false) => {
    if (rememberMe) {
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, { expires: 30 }); // 30 days
    } else {
      Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token);
    }
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeTokens: () => {
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
};

// User data management
export const userManager = {
  getUser: () => {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};

// Clear all auth data
export const clearAuthData = () => {
  tokenManager.removeTokens();
  userManager.removeUser();
};
