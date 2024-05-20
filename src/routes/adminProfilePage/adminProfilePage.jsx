import "./adminProfilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function AdminProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/admin/logout");
      updateUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="adminProfilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Admin Information</h1>
            <Link to="/admin/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={"/noavatar.png"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            {/* <span>
              E-mail: <b>{currentUser.email}</b>
            </span> */}
            <button onClick={handleLogout}>Logout</button>
          </div>
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

export default AdminProfilePage;
