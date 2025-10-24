import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const getLinkStyle = ({ isActive }) => {
    return isActive ? "navSelected" : null;
  };
  return (
    <nav>
      <div className="navItem">
        <NavLink to="/" className={getLinkStyle}>
          Home
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/myclaims" className={getLinkStyle}>
          My Claims
        </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/login" className={getLinkStyle}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
