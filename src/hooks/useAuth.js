import { useState, useEffect } from "react";
import { login, register, checkToken, logout } from "../utils/auth";

export const useAuth = (navigate) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        .catch(() => {
          setIsLoggedIn(false);
        })
        .finally(() => setIsLoggedInLoading(false));
    } else {
      setIsLoggedInLoading(false);
    }
  }, []);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

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
            .catch(() => setIsLoggedIn(false));
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch(console.error)
      .finally(() => setIsLoggedInLoading(false));
  };

  const handleRegistration = ({ email, password, username }) => {
    if (!password) return;

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
            .catch(() => setIsLoggedIn(false));
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch(console.error)
      .finally(() => setIsLoggedInLoading(false));
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  return {
    isLoggedIn,
    currentUser,
    isLoggedInLoading,
    handleLogin,
    handleRegistration,
    handleLogout,
  };
};
