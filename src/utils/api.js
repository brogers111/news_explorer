export function checkResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status} ${res.statusText}`);
}

export function saveArticle(article) {
  return new Promise((resolve) => {
    resolve({
      id: article.id || "65f7371e7bce9e7d331b11a0",
      keyword: article.keyword,
      date: article.date,
      title: article.title,
      image: article.image,
      description: article.description,
      source: article.source,
    });
  });
}

export function unsaveArticle(article) {
  return new Promise((resolve) => {
    resolve({
      id: article.id,
    });
  });
}
