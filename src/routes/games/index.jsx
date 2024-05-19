import { useEffect, useState } from "react";
import "./games.scss";
import { Link } from "react-router-dom";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8800/api/games/all")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  return (
    <div className="games-grid">
      {games.map((game) => (
        <Link to={`/game/${game.id}`} key={game.id}>
          <div className="card">
            {game.imageUrl && <img src={game.imageUrl} alt={game.title} />}
            <div className="card-content">
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Games;
