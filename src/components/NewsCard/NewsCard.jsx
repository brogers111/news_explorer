import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import defaultImage from '../../assets/default-image.jpg';

import './NewsCard.css';

function NewsCard({ article, handleSaveArticle, isArticleSaved }) {
    const { identifyLocation, isLoggedIn } = useContext(CurrentUserContext);

    const imageSource = article.image || defaultImage;

    const handleSaveClick = (e) => {
        e.stopPropagation();
        handleSaveArticle(article);
    };

    const handleCardClick = () => {
        window.open(article.link, "_blank");
    }

    return (
        <li className="card" onClick={handleCardClick}>
            { identifyLocation === "/" ? (
                <>
                    <div className="card__save-button-container">
                        { !isLoggedIn && <span className="card__hover-text">Sign in to save articles</span> }
                        <button className={`card__save-button ${isArticleSaved(article._id) ? "card__save-button_active" : ""}`} onClick={handleSaveClick}></button>
                    </div>
                    <div className="card__content">
                        <img src={imageSource} alt="article-image" className="card__image" />
                        <div className="card__info">
                            <p className="card__date">{article.date}</p>
                            <h3 className="card__title">{article.title}</h3>
                            <p className="card__desc">{article.text}</p>
                            <p className="card__source">{article.source}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="card__save-button-container">
                        <span className="card__hover-text">Remove from saved</span>
                        <button className="card__delete-button" onClick={handleSaveClick}></button>
                    </div>
                    <div className="card__keyword-container">
                        <p className="card__keyword">{article.keyword}</p>
                    </div>
                    <div className="card__content">
                        <img src={imageSource} alt="article-image" className="card__image" />
                        <div className="card__info">
                            <p className="card__date">{article.date}</p>
                            <h3 className="card__title">{article.title}</h3>
                            <p className="card__desc">{article.text}</p>
                            <p className="card__source">{article.source}</p>
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}

export default NewsCard;