import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import NavItem from "../UI/NavItem.jsx";
import "./Navbar.scss";

function Navbar() {
  const getLinkStyle = ({ isActive }) => {
    return isActive ? "navSelected" : null;
  };
  const { loggedInUser, logout } = useAuth();
  return (
    <nav>
      <div className="navCenter">
        <NavItem>
          <NavLink to="/" className={getLinkStyle}>
            Home
          </NavLink>
        </NavItem>
        {loggedInUser && (
          <NavItem>
            <NavLink to="/myclaims" className={getLinkStyle}>
              My Claims
            </NavLink>
          </NavItem>
        )}
        <NavItem>
          <NavLink to="/availableclaims" className={getLinkStyle}>
            Available Claims
          </NavLink>
        </NavItem>
      </div>
      <div className="navRight">
        {loggedInUser ? (
          <NavItem className="login">
            <NavLink to="/logout" onClick={logout}>
              Logout
            </NavLink>
          </NavItem>
        ) : (
          <NavItem className="login">
            <NavLink to="/login" className={getLinkStyle}>
              Login
            </NavLink>
          </NavItem>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
