import { useState, useEffect, useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import placeHolderImg from "../../../public/home-fon.jpg";
import "./matchedTeam.scss"; // Import the CSS file

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
  }, [currentUser.teams]);

  console.log("team", team);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="match-team-page">
      <h1>Team Matching</h1>
      {team && team.matchedTeam && team.matcher.length === 0 && (
        <Link to={`/team/${team.matchedTeam.id}`} className="team-container">
          <div>
            <img
              src={team.matchedTeam.img || placeHolderImg}
              alt={team.matchedTeam.name || "Placeholder"}
            />
            <div className="team-info">
              <h2>Team Name:</h2>
              <h2>{team.matchedTeam.name}</h2>
            </div>
          </div>
        </Link>
      )}
      {team && !team.matchedTeam && team.matcher.length > 0 && (
        <Link to={`/team/${team.matcher[0].id}`} className="team-container">
          <div>
            <img
              src={team.matcher[0].img || placeHolderImg}
              alt={team.matcher[0].name || "Placeholder"}
            />
            <div className="team-info">
              <h2>Team Name:</h2>
              <p>{team.matcher[0].name}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default MatchTeamPage;
