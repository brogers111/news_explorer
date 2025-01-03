import { checkResponse } from "./api";
import { NEWS_API_KEY } from "./constants";

export const getNews = ({
  searchQuery,
  language = "en",
  pageSize = 100,
  sortBy = "publishedAt",
}) => {
  const toDate = new Date().toISOString().split("T")[0];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);
  const fromDateStr = fromDate.toISOString().split("T")[0];

  const url = `https://newsapi.org/v2/everything?q=${searchQuery}&language=${language}&pageSize=${pageSize}&from=${fromDateStr}&to=${toDate}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;
  return processServerRequest(url);
};

function processServerRequest(url) {
  return fetch(url).then(checkResponse);
}

export const filterNewsData = (data, keyword) => {
  const formatKeyword = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedKeyword = formatKeyword(keyword);

  return data.articles
    .filter((article) => {
      return (
        article.title !== "[Removed]" && article.source.name !== "[Removed]"
      );
    })
    .map((article) => {
      const filteredArticle = {};
      filteredArticle.keyword = formattedKeyword;
      filteredArticle.title = article.title;
      filteredArticle.text = article.description;
      filteredArticle.date = formatDate(article.publishedAt);
      filteredArticle.source = article.source.name;
      filteredArticle.link = article.url;
      filteredArticle.image = article.urlToImage || null;

      return filteredArticle;
    });
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
