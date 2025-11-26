import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Header.scss";

function Header() {
  const { loggedInUser } = useAuth();
  return (
    <header>
      <Link to="/">
        <h1>FactCheck</h1>
      </Link>
      <div className="login">
        <p>Welcome {loggedInUser ? loggedInUser.UserFirstname : "Guest"}!</p>
      </div>
    </header>
  );
}

export default Header;
