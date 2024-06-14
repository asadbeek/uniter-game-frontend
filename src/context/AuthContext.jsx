import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem("games")) || null
  );

  const updateUser = (data) => {
    setCurrentUser(data);
  };

  const updateGames = (data) => {
    setGames(data);
  };

  //The useEffect hook ensures that whenever currentUser changes, the new value is saved to localStorage.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, games, updateGames }}
    >
      {children}
    </AuthContext.Provider>
  );
};
