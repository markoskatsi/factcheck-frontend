import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import NavItem from "../UI/NavItem.jsx";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

function Header() {
  const { loggedInUser, logout } = useAuth();
  const navigate = useNavigate();

  const getLinkStyle = ({ isActive }) => (isActive ? "navSelected" : null);

  return (
    <header>
      <Link to="/" className="brand">
        FactCheck
      </Link>

      <nav className="navCenter">
        <NavItem>
          <NavLink to="/" className={getLinkStyle}>
            Home
          </NavLink>
        </NavItem>
        {loggedInUser?.UserUsertypeID === 1 && (
          <NavItem>
            <NavLink to="/myclaims" className={getLinkStyle}>
              My Claims
            </NavLink>
          </NavItem>
        )}
        {loggedInUser?.UserUsertypeID === 2 && (
          <>
            <NavItem>
              <NavLink to="/availableclaims" className={getLinkStyle}>
                Available Claims
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/tasks" className={getLinkStyle}>
                My Tasks
              </NavLink>
            </NavItem>
          </>
        )}
        {loggedInUser?.UserUsertypeID === 3 && (
          <>
            <NavItem>
              <NavLink to="/triage" className={getLinkStyle}>
                Triage
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/review" className={getLinkStyle}>
                Review
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/editortasks" className={getLinkStyle}>
                Tasks
              </NavLink>
            </NavItem>
          </>
        )}
      </nav>

      <div className="headerRight">
        <span
          className="welcomeText"
          onClick={() => navigate(`/profile/${loggedInUser.UserID}`)}
        >
          {loggedInUser ? `Welcome, ${loggedInUser.UserFirstname}` : "Guest"}
        </span>
        {!loggedInUser && (
          <NavLink to="/login" className="authLink">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
