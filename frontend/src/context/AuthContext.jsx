import { createContext, useState, useEffect } from "react";
import { getToken, removeToken, saveToken } from "../utils/storage";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

  const loginUser = (token) => {
    saveToken(token);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    removeToken();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
