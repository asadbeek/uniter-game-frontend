import { useEffect, useState } from "react";
import "./adminGames.scss";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const AdminGames = () => {
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
        <Link to={`/admin/game/${game.id}`} key={game.id}>
          <div className="card">
            <img src={game.image || "default-image-url.jpg"} alt={game.name} />
            <div className="card-content">
              <h3>{game.name}</h3>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(game.description),
                }}
              ></div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminGames;
