import { BASE_URL } from "./constants";

export function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getSavedArticles(token) {
  return request(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function saveArticle(keyword, title, text, date, source, link, image, token) {
  const body = {
    keyword,
    title,
    text,
    date,
    source,
    link,
  };

  if (image) {
    body.image = image;
  }

  return request(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}

function unsaveArticle(articleId, token) {
  return request(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { getSavedArticles, saveArticle, unsaveArticle };
