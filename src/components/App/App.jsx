import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import RegisterSuccessModal from '../RegisterSuccessModal/RegisterSuccessModal';
import SavedArticles from '../SavedArticles/SavedArticles';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { saveArticle, unsaveArticle } from '../../utils/api';

import { getNews, filterNewsData } from '../../utils/newsApi';
import { register, login, checkToken, logout } from '../../utils/auth';

import './App.css';

function App() {
    const [newsData, setNewsData] = useState([]);
    const [savedArticles, setSavedArticles] = useState([]);
    const [activeModal, setActiveModal] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [identifyLocation, setIdentifyLocation] = useState();
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedInLoading, setIsLoggedInLoading] = useState(false);
    const [visibleCards, setVisibleCards] = useState(3);

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

    const handleIsLoading = () => {
        setIsLoading(true);
    };


    // Search & Card Functionality

    const handleSearch = (keyword) => {
        handleIsLoading();
        getNews({searchQuery: keyword})
        .then((data) => {
            const filteredData = filterNewsData(data, keyword);
            setNewsData(filteredData);
        })
        .finally(() => {
            setIsLoading(false)
        });
    };

    const handleShowMoreCards = () => {
        setVisibleCards((prevVisible) => prevVisible + 3);
    }


    // Login/Logout & Register Functionality

    const handleLogin = ({ email, password }) => {
        if (!email || !password){
            return;
        }

        setIsLoggedInLoading(true);
        login(email, password)
        .then((data) => {
            if (data.token) {
                checkToken(data.token)
                .then((userData) => {
                    console.log(userData);
                    setCurrentUser({
                        name: userData.data.username,
                        email: userData.data.email,
                        id: userData.data.id,
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
                setIsLoggedInLoading(false);
            }
            setIsLoggedIn(true);
            localStorage.setItem('token', data.token);
            navigate("/");
            closeActiveModal();
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    };

    const handleRegistration = ({ email, password, username }) => {
        if(password){
            setIsLoggedInLoading(true);
            register(email, password, username)
            .then((data) => {
                if (data.token) {
                    checkToken(data.token)
                    .then((userData) => {
                        console.log(userData);
                        setCurrentUser({
                            name: userData.data.username,
                            email: userData.data.email,
                            id: userData.data.id,
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
                    setIsLoggedInLoading(false);
                }
                setIsLoggedIn(true);
                localStorage.setItem('token', data.token);
                closeActiveModal();
                handleModalOpen("register-complete");
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
        }
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setCurrentUser({});
        if(location.pathname === "/saved-news") {
            navigate("/");
        }
    }


    // Save/Unsave Articles Functionality

    const handleSaveArticle = (article) => {
        if(!isLoggedIn){
            return
        }

        const apiCall = isArticleSaved(article.id) ? unsaveArticle : saveArticle;

        apiCall(article)
        .then((updatedArticle => {
            setSavedArticles((prev) => {
                if(isArticleSaved(article.id)){
                    return prev.filter((saved) => saved.id !== article.id);
                } else {
                    return [...prev, updatedArticle];
                }
            });
        }))
        .catch((error) => console.error("Save/Unsave Article Error:", error));
    }

    const isArticleSaved = (articleId) => {
        return savedArticles.some((saved) => saved.id === articleId);
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
        const token = localStorage.getItem('token');
        if (token) {
            checkToken(token)
            .then((userData) => {
                setCurrentUser({
                    name: userData.data.name,
                    email: userData.data.email,
                    id: userData.data.id,
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
                                element={<Main newsData={newsData} visibleCards={visibleCards} handleShowMoreCards={handleShowMoreCards} handleSaveArticle={handleSaveArticle} isArticleSaved={isArticleSaved}/>}
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
                                path='*'
                                element={
                                    isLoggedIn ? (
                                        <Navigate to="/saved-news" replace />
                                    ) : (
                                        <Navigate to="/" replace />
                                    )
                                }
                            >
                            </Route>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
            {activeModal === "login" && <LoginModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} handleLogin={handleLogin}/>}
            {activeModal === "signup" && <RegisterModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} handleRegistration={handleRegistration}/>}
            {activeModal === "register-complete" && <RegisterSuccessModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} handleModalOpen={handleModalOpen} />}
        </CurrentUserContext.Provider>
    )
}

export default App
