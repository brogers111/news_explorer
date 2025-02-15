export const NEWS_API_KEY = import.meta.env.VITE_APP_API_KEY || "";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.news-explorer.root.sx"
    : "http://localhost:3002";
