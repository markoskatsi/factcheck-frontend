import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import Action from "../UI/Actions.jsx";

function Login() {
  // Initialisation -------------------
  const { login } = useAuth();
  const navigate = useNavigate();

  const user = {
    UserID: 1,
    UserFirstname: "Markos"
  };

  // State ----------------------------
  // Handlers -------------------------
  const handleClick = () => {
    login(user);
    navigate("/");
  };

  // View -----------------------------
  return (
    <Action.Tray>
      <Action.Add showText buttonText="Submitter login" onClick={handleClick} />
    </Action.Tray>
  );
}

export default Login;
