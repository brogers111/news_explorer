import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import lightLogoutButton from "../../assets/logout-icon-light.svg";
import darkLogoutButton from "../../assets/logout-icon-dark.svg";
import './Navigation.css';

function Navigation({ handleModalOpen, handleLogout }) {
    const { currentUser, isLoggedIn, identifyLocation } = useContext(CurrentUserContext);

    const currentUserFirstName = currentUser?.name ? currentUser.name.split(" ")[0] : "";

    return(
        <nav className={`nav ${identifyLocation === "/saved-news" ? "nav_dark" : ""}`}>
            <Link to="/" className='nav__logo-link'>
                <p className="nav__logo">
                    <span className="nav__logo-text">NewsExplorer</span>
                </p>
            </Link>
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
        </nav>
    )
}

export default Navigation;