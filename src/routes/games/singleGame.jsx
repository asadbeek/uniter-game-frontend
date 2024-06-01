// games.scss
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "./games.scss";
import placeHolderImg from "../../../public/home-fon.jpg";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch game details
    fetch(`http://localhost:8800/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.error("Error fetching game:", error));
  }, [id]);

  useEffect(() => {
    if (game) {
      // Fetch teams based on game category
      fetch(`http://localhost:8800/api/team/category/${game.category}`)
        .then((response) => response.json())
        .then((data) => setTeams(data))
        .catch((error) => console.error("Error fetching teams:", error));
    }
  }, [game]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail--wrapper">
      <div className="game-image">
        <img src={game.image || "default-image-url.jpg"} alt={game.name} />
      </div>
      <div className="game-detail">
        <h1>{game.name}</h1>
        <p>
          <strong>Category:</strong> {game.category}
        </p>
        <div
          className="game-description"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(game.description),
          }}
        ></div>
        <div className="teams-section">
          <h2>Teams:</h2>
          <div className="teams-grid">
            {teams.length > 0 ? (
              teams.map((team) => (
                <div key={team.id} className="team-card">
                  <Link to={`/team/${team.id}`}>
                    <img src={team.img || placeHolderImg} alt={team.name} />
                    <div className="team-card-content">
                      <h3>Team name: {team.name}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(team.description),
                        }}
                      ></p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No teams available for this category</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
