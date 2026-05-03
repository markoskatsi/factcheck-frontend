import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import Icon from "../../UI/Icons.jsx";
import { Button, ButtonTray } from "../../UI/Button.jsx";
import API from "../../api/API.js";
import { useState } from "react";
import "./Login.scss";

const emptyUser = {
  UserEmail: "",
  UserPassword: "",
};

function Login() {
  // Initialisation -------------------
  const { login } = useAuth();
  const navigate = useNavigate();

  // State ----------------------------
  const [user, setUser] = useState(emptyUser);
  const [showError, setShowError] = useState(false);

  // Handlers -------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API.post("/auth/login", {
      UserEmail: user.UserEmail,
      UserPassword: user.UserPassword,
    });

    if (response.isSuccess) {
      const loggedInUser = response.result;
      login(loggedInUser);
      navigate("/");
    } else {
      setShowError(true);
      console.error("Login error:", response);
    }
  };

  // View -----------------------------
  return (
    <div className="loginOptions">
      <h1>Welcome to FactCheck</h1>
      <p>The platform to verify facts and combat misinformation</p>
      <form onSubmit={handleSubmit}>
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
        {showError && <p style={{ color: "red" }}>Invalid email or password</p>}
        <ButtonTray>
          <Button type="submit">
            <Icon.Tick />
            Log in
          </Button>
          <Button variant="secondary">
            <Icon.Plus />
            Register
          </Button>
        </ButtonTray>
      </form>
    </div>
  );
}

export default Login;
