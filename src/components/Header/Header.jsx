import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import './Header.css';

function Header({ handleModalOpen, handleSearch, handleLogout }){
    const { currentUser, identifyLocation } = useContext(CurrentUserContext);

    const currentUserFirstName = currentUser?.name ? currentUser.name.split(" ")[0] : "";

    return(
        <header className={`${identifyLocation === "/saved-news" ? "header__news" : "header"}`}>
            <section className="header__nav">
                <Navigation handleModalOpen={handleModalOpen} handleLogout={handleLogout}/>
            </section>
            { identifyLocation === "/saved-news" ? (
                <section className="header__saved-news">
                    <h2 className="header__title">Saved articles</h2>
                    <p className="header__desc">{currentUserFirstName}, you have 5 saved articles</p>
                    <p className="header__keywords">By keywords: <strong>Nature, Yellowstone, and 2 others</strong></p>
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