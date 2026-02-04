import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import Icon from "../UI/Icons.jsx";
import { Button } from "../UI/Button.jsx";
import useLoad from "../api/useLoad.js";
import { useState } from "react";
import "./Login.scss";

const emptyUser = {
  UserID: 0,
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserType: "",
};

function Login() {
  // Initialisation -------------------
  const { login } = useAuth();
  const navigate = useNavigate();
  const usersEndpoint = "/users";

  // State ----------------------------
  const [users, , loadingUsersMessage] = useLoad(usersEndpoint);
  const [user, setUser] = useState(emptyUser);

  // Handlers -------------------------
  const handleChange = (e) => {
    const selectedUser = users.find(
      (u) => u.UserID === parseInt(e.target.value)
    );
    setUser(selectedUser);
  };

  const handleSubmit = () => {
    if (user.UserID) {
      login(user);
      navigate("/");
    } else {
      alert("Please select a user to log in.");
    }
  };

  // View -----------------------------
  return (
    <div className="loginOptions">
      <h1>Welcome to FactCheck</h1>
      <h2>Select a user to log in</h2>
      {!users ? (
        <p>{loadingUsersMessage}</p>
      ) : (
        <select value={user.UserID} onChange={handleChange}>
          <option value={0} disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.UserID} value={user.UserID}>
              {user.UserFirstname} {user.UserLastname} ({user.UserUsertypeID})
            </option>
          ))}
        </select>
      )}
      <Button onClick={handleSubmit}>
        <Icon.Tick />
        Log in
      </Button>
    </div>
  );
}

export default Login;
