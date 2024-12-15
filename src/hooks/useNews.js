import { useState } from "react";
import { getNews, filterNewsData } from "../utils/newsApi";

export const useNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleSearch = (keyword) => {
    setIsLoading(true);
    getNews({ searchQuery: keyword })
      .then((data) => {
        const filteredData = filterNewsData(data, keyword);
        setNewsData(filteredData);
      })
      .finally(() => setIsLoading(false));
  };

  const handleShowMoreCards = () => {
    setVisibleCards((prevVisible) => prevVisible + 3);
  };

  return {
    newsData,
    isLoading,
    visibleCards,
    handleSearch,
    handleShowMoreCards,
  };
};
