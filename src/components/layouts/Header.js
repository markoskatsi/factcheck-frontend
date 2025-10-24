import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>FactCheck</h1>
      </Link>
      <div className="login">
        <p>Welcome Markos!</p>
      </div>
    </header>
  );
}

export default Header;
