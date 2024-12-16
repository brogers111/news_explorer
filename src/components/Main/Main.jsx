import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import About from '../About/About';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/Notfound';

import './Main.css';

function Main({ newsData, visibleCards, handleShowMoreCards, handleSaveArticle, isArticleSaved }) {
    const { isLoading } = useContext(CurrentUserContext);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        if (newsData.length > 0) {
            setHasSearched(true);
        }
    }, [newsData]);

    return (
        <main>
            { isLoading && <Preloader /> }

            { newsData.length === 0 && !isLoading && hasSearched && (
                <NotFound />
            )}

            { newsData.length > 0 && !isLoading && (
                <section className="cards">
                    <h2 className="cards__header">Search results</h2>
                    <ul className="cards__list">
                        {newsData.slice(0, visibleCards).map((article, index) => {
                            return <NewsCard key={index} article={article} handleSaveArticle={handleSaveArticle} isArticleSaved={isArticleSaved} />
                        })}
                    </ul>
                    {visibleCards < newsData.length && (
                        <button className="cards__show-more-button" onClick={handleShowMoreCards}>Show more</button>
                    )}
                </section>
            )}

            <About />
        </main>
    )
}

export default Main;