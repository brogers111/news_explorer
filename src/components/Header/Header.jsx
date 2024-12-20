import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import './Header.css';

function Header({ handleModalOpen, handleSearch, handleLogout, savedArticles }){
    const { currentUser, identifyLocation } = useContext(CurrentUserContext);

    const currentUserFirstName = currentUser?.name ? currentUser.name.split(" ")[0] : "";

    const getFormattedKeywords = (savedArticles) => {
        const keywords = savedArticles.map(article => article.keyword)

        const keywordCount = keywords.reduce((keywordObj, keyword) => {
            keywordObj[keyword] = (keywordObj[keyword] || 0) + 1;
            return keywordObj;
        }, {});

        const sortedKeywords = Object.entries(keywordCount)
        .sort((a, b) => b[1] - a[1])
        .map(([keyword]) => keyword);

        if (sortedKeywords.length === 0){
            return "None";
        }
        if (sortedKeywords.length === 1){
            return sortedKeywords[0];
        }
        if (sortedKeywords.length === 2){
            return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
        }
        if (sortedKeywords.length === 3) {
            return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and 1 other`;
        }
        if (sortedKeywords.length === 4) {
            return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${sortedKeywords.length - 2} others`;
        }
    }

    return(
        <header className={`${identifyLocation === "/saved-news" ? "header__news" : "header"}`}>
            <section className="header__nav">
                <Navigation handleModalOpen={handleModalOpen} handleLogout={handleLogout}/>
            </section>
            { identifyLocation === "/saved-news" ? (
                <section className="header__saved-news">
                    <h2 className="header__title">Saved articles</h2>
                    <p className="header__desc">{currentUserFirstName}, you have {savedArticles.length === 1 ? `${savedArticles.length} saved article`: `${savedArticles.length} saved articles`}</p>
                    <p className="header__keywords">By keywords: <strong>{getFormattedKeywords(savedArticles)}</strong></p>
                </section>
            ) : (
                <section className="header__search-form">
                    <SearchForm handleSearch={handleSearch}/>
                </section>
            )}
        </header>
    )
}


export default Header;