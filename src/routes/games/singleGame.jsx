import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./games.scss";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  console.log(game);

  useEffect(() => {
    fetch(`http://localhost:8800/api/games/${id}`)
      .then((response) => response.json())
      .then((data) => setGame(data))
      .catch((error) => console.error("Error fetching game:", error));
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail--wrapper">
      <img src={game.image || "default-image-url.jpg"} alt={game.name} />
      <div className="gaem-detail">
        <h1>{game.name}</h1>
        <p>
          <strong>Category:</strong> {game.category}
        </p>
        <p>
          <strong>Description:</strong> {game.description}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(game.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Updated At:</strong>{" "}
          {new Date(game.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default GameDetail;
