import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  //This state variable holds the current user's information. It is initialized with data from localStorage

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
    //AuthContext.Provider makes these properties available to any component that consumes this context.
    <AuthContext.Provider
      value={{ currentUser, updateUser, games, updateGames }}
    >
      {children}
    </AuthContext.Provider>
  );
};
