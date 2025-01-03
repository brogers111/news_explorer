import NewsCard from '../NewsCard/NewsCard';

import './SavedArticles.css';

function SavedArticles({ handleSaveArticle, isArticleSaved, savedArticles }) {

    const keywordCount = savedArticles.reduce((acc, article) => {
        const keyword = article.keyword;
        acc[keyword] = (acc[keyword] || 0) + 1;
        return acc;
    }, {});

    const sortedArticles = savedArticles
        .map((article) => ({
            ...article,
            keywordFrequency: keywordCount[article.keyword],
        }))
        .sort((a, b) => b.keywordFrequency - a.keywordFrequency);

    return (
        <section>
            { savedArticles.length > 0 ? (
                <section className="saved-articles">
                    <ul className="cards__list">
                        {sortedArticles.filter((article) => isArticleSaved(article.link)).map((article) => {
                            return <NewsCard key={article._id} article={article} handleSaveArticle={handleSaveArticle} isArticleSaved={isArticleSaved}/>
                        })}
                    </ul>
                </section>
                ) : (null) }
        </section>
    )
}

export default SavedArticles;