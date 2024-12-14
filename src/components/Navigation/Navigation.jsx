import { Link } from 'react-router-dom';
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import logoutButton from "../../assets/logout-icon.svg";
import './Navigation.css';

function Navigation({ handleModalOpen }) {
    const { isLoggedIn } = useContext(CurrentUserContext);

    return(
        <nav className="nav">
            <Link to="/" className='nav__logo-link'>
                <p className="nav__logo">
                    <span className="nav__logo-text">NewsExplorer</span>
                </p>
            </Link>
            {isLoggedIn ? (
                <>
                    <div className="nav__links">
                        <Link to="/">
                            <button className="nav__home-button">Home</button>
                        </Link>
                        <Link to="/saved-news">
                            <button className="nav__articles-button">Saved articles</button>
                        </Link>
                        <button className="nav__user-button">Elise <img src={logoutButton} alt="logout icon" className="nav__logout-icon" /></button>
                    </div>
                </>
            ): (
                <>
                    <div className="nav__links">
                        <Link to="/">
                            <button className="nav__home-button">Home</button>
                        </Link>
                        <button onClick={() => handleModalOpen("login")} className="nav__signin-button">Sign in</button>
                    </div>
                </>
            )}
        </nav>
    )
}

export default Navigation;