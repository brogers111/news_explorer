import NewsCard from '../NewsCard/NewsCard';

import './SavedArticles.css';

function SavedArticles({ newsData }) {

    return (
        <section>
            <section className="saved-articles">
                <ul className="cards__list">
                    {newsData.map((article) => {
                        return <NewsCard key={article.index} article={article}/>
                    })}
                </ul>
            </section>
        </section>
    )
}

export default SavedArticles;