import { STORAGE_KEYS } from "../constants";

// Note: Backend uses httpOnly cookies for authentication
// No need to manually manage tokens on the frontend
// Cookies are automatically sent with each request via axios withCredentials: true

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
  userManager.removeUser();
};
