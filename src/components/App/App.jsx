import { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SavedArticles from '../SavedArticles/SavedArticles';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { getNews, filterNewsData } from '../../utils/newsApi';
import { register, login, checkToken, logout } from '../../utils/auth';

import './App.css';

function App() {
    const [newsData, setNewsData] = useState([]);
    const [activeModal, setActiveModal] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [identifyLocation, setIdentifyLocation] = useState();
    const [currentUser, setCurrentUser] = useState({});
    const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
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
            console.log(filteredData);
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

        handleIsLoading();
        login(email, password)
        .then((data) => {
            if (data.token) {
                checkToken(data.token)
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
            handleIsLoading();
            register(email, password, username)
            .then((data) => {
                if (data.token) {
                    checkToken(data.token)
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
                setIsLoggedIn(true);
                localStorage.setItem('token', data.token);
                navigate("/");
                closeActiveModal();
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
                        <Header handleModalOpen={handleModalOpen} handleSearch={handleSearch} handleLogout={handleLogout}/>
                        <Routes>
                            <Route
                                path='/'
                                element={<Main newsData={newsData} visibleCards={visibleCards} handleShowMoreCards={handleShowMoreCards}/>}
                            />
                            <Route
                                path='/saved-news'
                                element={
                                    <ProtectedRoute>
                                        <SavedArticles newsData={newsData} />
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
        </CurrentUserContext.Provider>
    )
}

export default App
