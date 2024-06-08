import { createContext, useEffect, useState } from "react";

export const GamesContext = createContext();

export const GamesContextProvider = ({ children }) => {
  const [games, setGames] = useState(
    JSON.parse(localStorage.getItem("games")) || null
  );

  const updateGames = (data) => {
    setGames(data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(games));
  }, [games]);

  return (
    <GamesContext.Provider value={{ games, updateGames }}>
      {children}
    </GamesContext.Provider>
  );
};
