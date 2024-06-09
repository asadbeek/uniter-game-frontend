import { useState, useEffect, useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import placeHolderImg from "../../../public/home-fon.jpg";

function MatchTeamPage() {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await apiRequest.get(
          `/team/${currentUser.teams[0].id}`
        );
        setTeam(response.data.team);
        console.log("response:", response);
      } catch (err) {
        setError("Failed to fetch team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);
  console.log("team", team);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Team Matching</h1>
      <Link to={`/team/${team.id}`} className="">
        {team && team.matchedTeam && !team.matcher.length > 0 && (
          <div>
            {team.matchedTeam.img ? (
              <img
                src={team.matchedTeam.img}
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
            <h2>{team.matchedTeam.name}</h2>
            {/* Add more fields as necessary */}
          </div>
        )}
      </Link>
      <Link to={`/team/${team.id}`} className="">
        {team && !team.matchedTeam && team.matcher.length > 0 && (
          <div>
            <img src={team.matcher[0].img} alt="" />
            <h2>{team.matcher[0].name}</h2>
            {/* Add more fields as necessary */}
          </div>
        )}
      </Link>
    </div>
  );
}

export default MatchTeamPage;
