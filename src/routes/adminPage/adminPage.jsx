import { Link, useNavigate } from "react-router-dom";
import "./adminPage.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (currentUser.role != "admin") {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="adminPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>

          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/logo.png" alt="" />
      </div>
    </div>
  );
}

export default AdminPage;
