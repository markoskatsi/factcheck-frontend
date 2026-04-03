import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import Icon from "../../UI/Icons.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import useLoad from "../../api/useLoad.js";
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
  /* Dropdown login handlers
  const handleChange = (e) => {
    const selectedUser = users.find(
      (u) => u.UserID === parseInt(e.target.value),
    );
    setUser(selectedUser);
  };

  const handleSubmitDropdown = () => {
    const selectedUser = users.find(
      (u) =>
        u.UserEmail === user.UserEmail &&
        u.UserFirstname === user.UserFirstname,
    );
    setUser(selectedUser);
    if (user.UserID) {
      login(user);
      navigate("/");
    } else {
      alert("Please select a user to log in.");
    }
  };
  */

  const handleSubmit = () => {
    if (!users) {
      alert("No user found with that email.");
      return;
    }
    const selectedUser = users.find((u) => u.UserEmail === user.UserEmail);
    if (selectedUser) {
      login(selectedUser);
      navigate("/");
    } else {
      alert("No user found with that email.");
    }
  };

  // View -----------------------------
  return (
    <div className="loginOptions">
      <h1>Welcome to FactCheck</h1>
      <p>The platform to verify facts and combat misinformation</p>
      {/* <h2>Select a user to log in</h2>
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
      </Button> */}
      <input
        type="text"
        placeholder="Email"
        value={user.UserEmail}
        onChange={(e) => setUser({ ...user, UserEmail: e.target.value })}
      />
      <input type="password" placeholder="Password" />
      <ButtonTray>
        <Button onClick={handleSubmit}>
          <Icon.Tick />
          Log in
        </Button>
        <Button variant="secondary">
          <Icon.Plus />
          Register
        </Button>
      </ButtonTray>
    </div>
  );
}

export default Login;
