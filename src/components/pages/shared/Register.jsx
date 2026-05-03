import { useState } from "react";
import API from "../../api/API.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import Icon from "../../UI/Icons.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import "./Login.scss";

const emptyUser = {
  UserFirstname: "",
  UserLastname: "",
  UserEmail: "",
  UserPassword: "",
  UserUsertypeID: 1,
};

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState(emptyUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.post("/users", user);
    if (response.isSuccess) {
      alert("Successfully registered! You can now log in.");
      navigate("/login");
    } else {
      alert("Registration failed. Please try again.");
      console.error("Registration error:", response);
    }
  };

  return (
    <div className="loginOptions">
      <h1>Create an account</h1>
      <p>Start submitting claims</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First name"
          value={user.UserFirstname}
          onChange={(e) => setUser({ ...user, UserFirstname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last name"
          value={user.UserLastname}
          onChange={(e) => setUser({ ...user, UserLastname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={user.UserEmail}
          onChange={(e) => setUser({ ...user, UserEmail: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.UserPassword}
          onChange={(e) => setUser({ ...user, UserPassword: e.target.value })}
        />
        <ButtonTray>
          <Button type="submit">
            <Icon.Tick />
            Register
          </Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            <Icon.Cross />
            Cancel
          </Button>
        </ButtonTray>
      </form>
    </div>
  );
};

export default Register;
