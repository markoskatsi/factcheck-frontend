import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  //Initialisation ---------------------------
  // State -----------------------------------
  const [loggedInUser, setLoggedInUser] = useState(null);
  const loggedInUserID = loggedInUser ? loggedInUser.UserID : null;

  // Handlers --------------------------------
  const login = (user) => setLoggedInUser(user);
  const logout = () => setLoggedInUser(null);

  // View ------------------------------------
  return (
    <AuthContext.Provider value={{ loggedInUser, loggedInUserID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
