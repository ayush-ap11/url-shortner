// Environment configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
  githubClientId: import.meta.env.VITE_GITHUB_CLIENT_ID || "",
  githubRedirectUri:
    import.meta.env.VITE_GITHUB_REDIRECT_URI ||
    "http://localhost:5173/auth/github/callback",
  appUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

export default config;
