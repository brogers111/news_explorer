import { checkResponse } from "./api";
import { NEWS_API_KEY, NEWS_API_URL } from "./constants";

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

  const url = `${NEWS_API_URL}?q=${searchQuery}&language=${language}&pageSize=${pageSize}&from=${fromDateStr}&to=${toDate}&sortBy=${sortBy}&apiKey=${NEWS_API_KEY}`;
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
      filteredArticle.id = article.url;
      filteredArticle.keyword = formattedKeyword;
      filteredArticle.date = formatDate(article.publishedAt);
      filteredArticle.title = article.title;
      filteredArticle.description = article.description;
      filteredArticle.source = article.source.name;
      filteredArticle.image = article.urlToImage;

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
