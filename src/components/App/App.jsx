import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SavedArticles from '../SavedArticles/SavedArticles';
import { getNews, filterNewsData } from '../../utils/newsApi';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import './App.css';

function App() {
    const [newsData, setNewsData] = useState({});
    const [activeModal, setActiveModal] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [identifyLocation, setIdentifyLocation] = useState();

    const location = useLocation();

    // Modal Open and Close
    const handleModalOpen = (modalType) => {
        setActiveModal(modalType);
    };
    
    const closeActiveModal = useCallback(() => {
        setActiveModal("");
    }, []);
    
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal_opened")) {
          closeActiveModal();
        }
    };

    const handleIsLoading = () => {
        setIsLoading(true);
    };

    const handleSearch = (keyword) => {
        handleIsLoading();
        getNews({searchQuery: keyword})
        .then((data) => {
            const filteredData = filterNewsData(data, keyword);
            setNewsData(filteredData);
            console.log(filteredData);
        })
        .finally(() => {
            setIsLoading(false)
        });
    }

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

      useEffect(() => {
        setIdentifyLocation(location.pathname || "/");
      }, [location]);

    return (
        <CurrentUserContext.Provider value={{isLoading, isLoggedIn, identifyLocation}}>
            <div className="page__wrapper">
                <div className="page">
                    <div className="page__content">
                        <Header handleModalOpen={handleModalOpen} handleSearch={handleSearch}/>
                        <Routes>
                            <Route
                                path='/'
                                element={<Main newsData={newsData} />}
                            />
                            <Route
                                path='/saved-news'
                                element={<SavedArticles newsData={newsData} />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
            {activeModal === "login" && <LoginModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen}/>}
            {activeModal === "signup" && <RegisterModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen}/>}
        </CurrentUserContext.Provider>
    )
}

export default App
