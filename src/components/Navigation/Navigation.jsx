import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import lightLogoutButton from "../../assets/logout-icon-light.svg";
import darkLogoutButton from "../../assets/logout-icon-dark.svg";
import lightHamburgerIcon from "../../assets/mobile-menu-light.svg";
import darkHamburgerIcon from "../../assets/mobile-menu-dark.svg";
import './Navigation.css';

function Navigation({ handleModalOpen, handleLogout }) {
    const { currentUser, isLoggedIn, identifyLocation } = useContext(CurrentUserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const currentUserFirstName = currentUser?.name ? currentUser.name.split(" ")[0] : "";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return(
        <nav className={`nav ${identifyLocation === "/saved-news" ? "nav_dark" : ""}`}>
            <Link to="/" className='nav__logo-link'>
                <p className="nav__logo">
                    <span className="nav__logo-text">NewsExplorer</span>
                </p>
            </Link>
            <div className="nav__links-container">
                {isLoggedIn ? (
                    <>
                        <div className="nav__links">
                            <Link to="/">
                                <button className={`nav__home-button ${identifyLocation === "/" ? "selected" : ""}`}>Home</button>
                            </Link>
                            <Link to="/saved-news">
                                <button className={`nav__home-button ${identifyLocation === "/saved-news" ? "selected" : ""}`}>Saved articles</button>
                            </Link>
                            <button onClick={handleLogout} className="nav__user-button">{currentUserFirstName}<img src={identifyLocation === "/saved-news" ? darkLogoutButton : lightLogoutButton} alt="logout icon" className="nav__logout-icon" /></button>
                        </div>
                    </>
                ): (
                    <>
                        <div className="nav__links">
                            <Link to="/">
                                <button className={`nav__home-button ${identifyLocation === "/" ? "selected" : ""}`}>Home</button>
                            </Link>
                            <button onClick={() => handleModalOpen("login")} className="nav__signin-button">Sign in</button>
                        </div>
                    </>
                )}
                <button className="nav__hamburger-menu" onClick={toggleMenu}>
                    <img src={identifyLocation === "/saved-news" ? darkHamburgerIcon : lightHamburgerIcon} alt="menu" />
                </button>
            </div>
        </nav>
    )
}

export default Navigation;