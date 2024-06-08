import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import placeHolderImg from "../../../public/home-fon.jpg";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  async function onDelete(id) {
    try {
      const res = await apiRequest.delete(`/team/${id}`);
      if (res.status === 200) {
        console.log("Team deleted successfully");

        const updatedUser = await apiRequest.get(`/users/${currentUser.id}`);

        updateUser(updatedUser.data);
        console.log(updatedUser);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button className="btn-update">Update Profile</button>
            </Link>
          </div>

          <div className="info">
            <div className="title">
              <span>
                Avatar:
                <img src={currentUser.avatar || "noavatar.png"} alt="" />
              </span>
              <Link to="/profile/matched">
                <button className="mtch-btn">Matched Team</button>
              </Link>
            </div>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button className="btn-update" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <div className="title">
            <h1>My Team</h1>
            {/* <Link to="/add">
              <button>Create Team</button>
            </Link> */}
            {currentUser &&
            currentUser.teams &&
            currentUser.teams.length > 0 ? (
              <div>
                <p>You have a Team</p>
              </div>
            ) : (
              <>
                <Link to="/add">
                  <button>Create Team</button>
                </Link>
              </>
            )}
          </div>
          {currentUser.teams &&
            currentUser.teams.length > 0 &&
            currentUser.teams.map((team) => (
              <div key={team.id}>
                <div className="card">
                  {team.img ? (
                    <img src={team.img} alt="" />
                  ) : (
                    <img src={placeHolderImg} />
                  )}
                  <div className="textContainer">
                    <h2 className="title">{team.name}</h2>
                    <button
                      className="btnDelete"
                      onClick={() => onDelete(team.id)}
                    >
                      Delete
                    </button>
                    <p className="address">
                      <img src="/pin.png" alt="" />
                      <span>{team.city}</span>
                    </p>

                    <p className="price">Players: {team.numberOfPlayers}</p>
                    <div className="bottom">
                      <div className="features">
                        {team.category &&
                          team.category.split(",").map((category) => {
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
              </div>
            ))}
        </div>
      </div>
      <div className="imageContainer">
        <div className="wrapper">
          <img className="img1" src="/logo.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
