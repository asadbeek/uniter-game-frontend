import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AdminNavbar from "../../components/adminNavbar/adminNavbar";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  return currentUser && !currentUser.role ? (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

function RequireAdmin() {
  const { currentUser } = useContext(AuthContext);

  console.log("requireAdmin", currentUser);

  return currentUser && currentUser.role == "admin" ? (
    <div className="layout">
      <div className="navbar">
        <AdminNavbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/admin" />
  );
}

export { Layout, RequireAuth, RequireAdmin };
