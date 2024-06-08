import "./singlePage.scss";
import placeHolderImg from "../../../public/home-fon.jpg";
import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SinglePage() {
  const team = useLoaderData();

  const { currentUser } = useContext(AuthContext);

  const handleMatchTeam = async () => {
    try {
      const res = await apiRequest.get(
        `/team/match/${currentUser.id}/${team.team.id}`
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          {team.team.img ? (
            <img
              src={team.team.img}
              alt=""
              style={{
                maxWidth: "100%",
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          ) : (
            <img src={placeHolderImg} />
          )}
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>Team Name:</h1>
                <h2>{team.team.name}</h2>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{team.team.city}</span>
                </div>
                <p className="title">Available Days</p>
                <div>
                  <div className="price">{team.team.availableDaysAndTimes}</div>
                </div>
                <div className="btnMatch">
                  <button onClick={() => handleMatchTeam()}>Match</button>
                </div>
              </div>
              <div className="user">
                <img src={team.team.creator.avatar} alt="" />
                <span>{team.team.creator.username}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Game Categories</p>
          <div className="listVertical">
            <div className="bottom">
              {team.team.category.split(",").join(", ")}
            </div>
          </div>
          <p className="title">Number of players</p>
          <div className="listVertical">
            <div className="bottom">{team.team.numberOfPlayers}</div>
          </div>
          <p className="title">Description</p>
          <div className="listVertical">
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(team.team.description),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
