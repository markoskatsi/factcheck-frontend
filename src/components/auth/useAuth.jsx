import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //Initialisation ---------------------------
  // State -----------------------------------
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      return null;
    }
    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });
  const loggedInUserID = loggedInUser ? loggedInUser.UserID : null;

  // Handlers --------------------------------
  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setLoggedInUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
  };

  // View ------------------------------------
  return (
    <AuthContext.Provider
      value={{ loggedInUser, loggedInUserID, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
