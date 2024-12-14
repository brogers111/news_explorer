import { useState, useCallback, useEffect } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import './App.css';

function App() {
    const [activeModal, setActiveModal] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Add state for search term and add it to the card object
    // Use map to get all keywords into an array of search term keys
    // Iterate through array and add keywords to object and keep a count
    // Use template literal to display different text options

    // Modal Open and Close
    const handleModalOpen = (modalType) => {
        setActiveModal(modalType);
      }
    
      const closeActiveModal = useCallback(() => {
        setActiveModal("");
      }, []);
    
      const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal_opened")) {
          closeActiveModal();
        }
      }

      // Use Location.pathname hook to identify location and solve conditional

      useEffect(() => {

        if (!activeModal) return;
    
        const handleEscape = (e) => {
          if (e.key === "Escape" && activeModal) {
            closeActiveModal();
          }
        };
        document.addEventListener("keydown", handleEscape);
    
        return() => {
          document.removeEventListener("keydown", handleEscape);
        }
      }, [activeModal, closeActiveModal]);

    return (
        <CurrentUserContext.Provider value={{isSearching, isLoggedIn}}>
            <div className="page__wrapper">
                <div className="page">
                    <div className="page__content">
                        <Header handleModalOpen={handleModalOpen}/>
                        <Main />
                    </div>
                    <Footer />
                </div>
            </div>
            {activeModal === "login" && <LoginModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} isLoading={isLoading} handleModalOpen={handleModalOpen}/>}
            {activeModal === "signup" && <RegisterModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} isLoading={isLoading} handleModalOpen={handleModalOpen}/>}
        </CurrentUserContext.Provider>
    )
}

export default App
