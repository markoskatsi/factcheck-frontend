import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="navItem">
        <a href="/">Home</a>
      </div>
      <div className="navItem">
        <a href="/signin">Sign In</a>
      </div>
      <div className="navItem">
        <a href="/contactus">Contact Us</a>
      </div>
    </nav>
  );
}
export default Navbar;
