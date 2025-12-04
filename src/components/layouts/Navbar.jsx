import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Navbar.scss";

function Navbar() {
  const getLinkStyle = ({ isActive }) => {
    return isActive ? "navSelected" : null;
  };
  const { loggedInUser, logout } = useAuth();
  return (
    <nav>
      <div className="navCenter">
        <div className="navItem">
          <NavLink to="/" className={getLinkStyle}>
            Home
          </NavLink>
        </div>
        {loggedInUser && (
          <div className="navItem">
            <NavLink to="/myclaims" className={getLinkStyle}>
              My Claims
            </NavLink>
          </div>
        )}
      </div>
      <div className="navRight">
        {loggedInUser ? (
          <div className="navItem">
            <NavLink to="/logout" onClick={logout}>
              Logout
            </NavLink>
          </div>
        ) : (
          <div className="navItem">
            <NavLink to="/login" className={getLinkStyle}>
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
