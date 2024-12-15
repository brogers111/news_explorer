import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import About from '../About/About';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/Notfound';

import './Main.css';

function Main({ newsData }) {
    const { isLoading } = useContext(CurrentUserContext);
    const [visibleCards, setVisibleCards] = useState(3);

    const handleShowMore = () => {
        setVisibleCards((prevVisible) => prevVisible + 3);
    }

    useEffect(() => {
        setVisibleCards(3);
    }, [newsData]);

    return (
        <main>
            { isLoading && <Preloader /> }

            { newsData.length === 0 && !isLoading ? (
                <NotFound />
            ) : null }

            { newsData.length > 0 && !isLoading && (
                <section className="cards">
                    <h2 className="cards__header">Search results</h2>
                    <ul className="cards__list">
                        {newsData.slice(0, visibleCards).map((article, index) => {
                            return <NewsCard key={index} article={article}/>
                        })}
                    </ul>
                    {visibleCards < newsData.length && (
                        <button className="cards__show-more-button" onClick={handleShowMore}>Show more</button>
                    )}
                </section>
            )}

            <About />
        </main>
    )
}

export default Main;