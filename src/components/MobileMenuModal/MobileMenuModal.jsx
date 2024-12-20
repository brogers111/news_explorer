import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import lightLogoutButton from "../../assets/logout-icon-light.svg";
import "./MobileMenuModal.css";

function MobileMenuModal({ activeModal, closeActiveModal, handleOutsideClick, handleModalOpen, handleLogout }) {
    const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

    const currentUserFirstName = currentUser?.name ? currentUser.name.split(" ")[0] : "";

    return(
        <div className={`modal__mobile-background ${activeModal === "mobile-menu" ? "modal_opened" : ""}`} onClick={handleOutsideClick}>
            <div className="modal__mobile-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__mobile-nav-header">
                    <Link to="/" className="modal__mobile-logo-link" onClick={closeActiveModal}>
                        <p className="modal__mobile-logo">
                            <span className="modal__mobile-logo-text">NewsExplorer</span>
                        </p>
                    </Link>
                    <button onClick={closeActiveModal} type="button" className="modal__mobile-close-icon"></button>
                </div>
                {isLoggedIn ? (
                    <div className="modal__mobile-nav-links">
                        <Link to="/" onClick={closeActiveModal}>
                            <button className="modal__mobile-home-button">Home</button>
                        </Link>
                        <Link to="/saved-news" onClick={closeActiveModal}>
                            <button className="modal__mobile-articles-button">Saved articles</button>
                        </Link>
                        <button onClick={handleLogout} className="modal__mobile-signin-button">{currentUserFirstName}<img src={lightLogoutButton} alt="logout icon" className="modal__mobile-logout-icon" /></button>
                    </div>
                ) : (
                    <div className="modal__mobile-nav-links">
                        <Link to="/" onClick={closeActiveModal}>
                            <button className="modal__mobile-home-button">Home</button>
                        </Link>
                        <button onClick={() => handleModalOpen("login")} className="modal__mobile-signin-button">Sign in</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileMenuModal;