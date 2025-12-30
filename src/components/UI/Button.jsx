import "./Button.scss";

export function Button({ children, onClick, type = "button" }) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
