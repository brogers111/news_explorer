import NewsCard from '../NewsCard/NewsCard';

import './SavedArticles.css';

function SavedArticles({ newsData }) {

    return (
        <section>
            <section className="saved-articles">
                <ul className="cards__list">
                    {newsData.map((article, index) => {
                        return <NewsCard key={index} article={article}/>
                    })}
                </ul>
            </section>
        </section>
    )
}

export default SavedArticles;