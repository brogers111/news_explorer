import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);

  if (isLoggedInLoading) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
}
