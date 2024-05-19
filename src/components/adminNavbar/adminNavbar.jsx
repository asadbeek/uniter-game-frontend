import { useContext, useState } from "react";
import "./adminNavbar.scss";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminNavbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const location = useLocation();

  // Define an array of routes where the navigation bar should not appear
  const excludedRoutes = ["/login", "/admin/login"];

  // Check if the current route is in the excludedRoutes array
  const shouldRenderNavBar = !excludedRoutes.includes(location.pathname);

  return (
    <nav>
      <div className="left">
        <a href="/admin" className="logo">
          <img src="/logo.png" alt="" />
          <span>Uniter</span>
        </a>
        {shouldRenderNavBar && (
          <>
            <a href="/admin/game/list">Game List</a>
            <a href="/admin/team/list">Team List</a>
            <a href="/add/game">Create Game</a>
          </>
        )}
      </div>
      <div className="right">
        {currentUser && currentUser.role == "admin" ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/admin/profile" className="profile">
              <span>Admin</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Game List</a>
          <a href="/admin/team/list">Team List</a>
          <a href="/add/game">Create Game</a>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
