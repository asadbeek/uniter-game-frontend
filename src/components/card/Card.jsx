import { Link } from "react-router-dom";
import "./card.scss";
import placeHolderImg from "../../../public/home-fon.jpg";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/team/${item.id}`} className="imageContainer">
        {item.img ? (
          <img src={item.img} alt="" />
        ) : (
          <img src={placeHolderImg} />
        )}
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/team/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.city}</span>
        </p>

        <p className="price">Players: {item.numberOfPlayers}</p>
        <div className="bottom">
          <div className="features">
            {item.category &&
              item.category.split(",").map((category) => {
                return (
                  <div className="feature" key={category}>
                    <span>{category}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
