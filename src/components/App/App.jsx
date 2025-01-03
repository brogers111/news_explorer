import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import MobileMenuModal from '../MobileMenuModal/MobileMenuModal';
import RegisterSuccessModal from '../RegisterSuccessModal/RegisterSuccessModal';
import SavedArticles from '../SavedArticles/SavedArticles';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { getSavedArticles, saveArticle, unsaveArticle } from '../../utils/api';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { getNews, filterNewsData } from '../../utils/newsApi';
import { register, login, checkToken } from '../../utils/auth';

import './App.css';

function App() {
    const [newsData, setNewsData] = useState([]);
    const [savedArticles, setSavedArticles] = useState([]);
    const [activeModal, setActiveModal] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [identifyLocation, setIdentifyLocation] = useState();
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
    const [visibleCards, setVisibleCards] = useState(3);
    const [hasSearched, setHasSearched] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();


    // Modal Open, Close, and Loading Functionality

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


    // Search & Card Functionality

    const handleSearch = (keyword) => {
        setIsLoading(true);
        getNews({searchQuery: keyword})
        .then((data) => {
            const filteredData = filterNewsData(data, keyword);
            setNewsData(filteredData);
            setHasSearched(true);
        })
        .catch((error) => {
            console.error("Search error:", error);
            setHasSearched(true);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const handleShowMoreCards = () => {
        setVisibleCards((prevVisible) => prevVisible + 3);
    }


    // Login/Logout & Register Functionality

    function getToken(){
        return localStorage.getItem("token");
    }

    const handleLogin = ({ email, password }) => {
        if (!email || !password) return;

        setIsLoggedInLoading(true);
        login(email, password)
        .then((data) => {
            if (data.token) {
                checkToken(data.token)
                .then((userData) => {
                    setCurrentUser({
                        name: userData.name,
                        email: userData.email,
                        id: userData._id,
                    });
                    setIsLoggedIn(true);
                    navigate(location.state?.from?.pathname || "/");
                    closeActiveModal();
                })
                .catch((error) => {
                    console.error("Token validation failed:", error);
                    setIsLoggedIn(false);
                })
                .finally(() => {
                    setIsLoggedInLoading(false);
                });
            } else {
                setIsLoggedInLoading(false);
            }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    };

    const handleRegistration = ({ email, password, name }) => {
        if(password){
            setIsLoggedInLoading(true);
            register(email, password, name)
            .then(() => {
                closeActiveModal();
                handleModalOpen("register-complete");
            })
            .catch(console.error)
            .finally(() => setIsLoggedInLoading(false));
        }
    };

    const handleLogout = () => {
        closeActiveModal();
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setCurrentUser({});
        setNewsData([]);
        setSavedArticles([]);
        setHasSearched(false);
        if(location.pathname === "/saved-news") {
            navigate("/");
        }
    }

    // Save/Unsave Articles Functionality

    const handleSaveArticle = (article) => {
        if (!isLoggedIn) return;
        const token = getToken();
      
        if (isArticleSaved(article._id)) {
          unsaveArticle(article._id, token)
            .then(() => {
              setSavedArticles((prev) =>
                prev.filter((item) => item._id !== article._id)
              );
            })
            .catch((error) => console.error("Unsave error:", error));
        } else {
          saveArticle(
            article.keyword,
            article.title,
            article.text,
            article.date,
            article.source,
            article.link,
            article.image,
            token
          )
            .then((newArticle) => {
              setSavedArticles((prev) => [...prev, newArticle]);
            })
            .catch((error) => console.error("Save error:", error));
        }
      };      

    const isArticleSaved = (articleId) => {
        return savedArticles.some((saved) => saved._id === articleId);
    }


    // UseEffects

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

    useEffect(() => {
        setVisibleCards(3);
    }, [newsData]);

    useEffect(() => {
        const token = getToken();
        if (token) {
            getSavedArticles(token)
                .then((data) => {
                    setSavedArticles(data);
                })
                .catch((error) => {
                    if (error.message.includes("404")){
                        return [];
                    }
                    console.error("Failed to fetch saved articles:", error);
                    setSavedArticles([]);
                });
        }
    }, []);
    
    useEffect(() => {
        const token = getToken();
        if (token) {
            checkToken(token)
            .then((userData) => {
                setCurrentUser({
                    name: userData.name,
                    email: userData.email,
                    id: userData._id,
                });
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.error("Token validation failed:", error);
                setIsLoggedIn(false);
            })
            .finally(() => {
                setIsLoggedInLoading(false);
            });
        } else {
            setIsLoggedIn(false);
            setIsLoggedInLoading(false);
        }
    }, []);
      

    return (
        <CurrentUserContext.Provider value={{currentUser, isLoading, isLoggedIn, identifyLocation, isLoggedInLoading}}>
            <div className="page__wrapper">
                <div className="page">
                    <div className="page__content">
                        <Header handleModalOpen={handleModalOpen} handleSearch={handleSearch} handleLogout={handleLogout} savedArticles={savedArticles}/>
                        <Routes>
                            <Route
                                path='/'
                                element={<Main newsData={newsData} visibleCards={visibleCards} handleShowMoreCards={handleShowMoreCards} handleSaveArticle={handleSaveArticle} isArticleSaved={isArticleSaved} hasSearched={hasSearched}/>}
                            />
                            <Route
                                path='/saved-news'
                                element={
                                    <ProtectedRoute>
                                        <SavedArticles handleSaveArticle={handleSaveArticle} isArticleSaved={isArticleSaved} savedArticles={savedArticles}/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
            {activeModal === "login" && <LoginModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} handleLogin={handleLogin}/>}
            {activeModal === "signup" && <RegisterModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} handleRegistration={handleRegistration}/>}
            {activeModal === "register-complete" && <RegisterSuccessModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} />}
            {activeModal === "mobile-menu" && <MobileMenuModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} handleLogout={handleLogout}/>}
        </CurrentUserContext.Provider>
    )
}

export default App
