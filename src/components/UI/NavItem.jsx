
function NavItem({ children, className = "" }) {
  return (
    <div className={`navItem ${className}`}>
      {children}
    </div>
  );
}

export default NavItem;