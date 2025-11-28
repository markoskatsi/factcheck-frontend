import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import Action from "../UI/Actions.jsx";
import useLoad from "../api/useLoad.js";
import { useState } from "react";

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
  const [users, , loadingUsersMessage, setLoadingUsersMessage] =
    useLoad(usersEndpoint);
  const [selectedUser, setSelectedUser] = useState(null);
  // Handlers -------------------------

  const handleChange = (e) => {};
  const handleSubmit = () => {
    login(selectedUser);
    navigate("/");
  };

  // View -----------------------------
  return (
    <>
      {!users ? (
        <p>{loadingUsersMessage}</p>
      ) : (
        <select name="UserID" value={users.UserID} onChange={handleChange}>
          <option value={0} disabled>
            Select a user
          </option>
          {users.map((user) => (
            <option key={user.UserID} value={user.UserID}>
              {user.UserFirstname} ({user.UserType})
            </option>
          ))}
        </select>
      )}
      <Action.Tray>
        <Action.Submit showText buttonText={"Log in"} onClick={handleSubmit} />
      </Action.Tray>
    </>
  );
}

export default Login;
