export const NEWS_API_KEY = "426f463ec70c420a91874a51172acf63";
export const NEWS_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
