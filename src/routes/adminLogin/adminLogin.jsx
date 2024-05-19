import "./adminLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function AdminLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // setError("");

  const { updateUser } = useContext(AuthContext);

  console.log(userName, password);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await apiRequest.post("/admin/login", {
        username: userName,
        password: password,
      });

      console.log("res", res);

      updateUser(res.data);

      navigate("/admin");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="adminLogin">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/login">If you are user?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/dota2.png" alt="" />
      </div>
    </div>
  );
}

export default AdminLogin;
