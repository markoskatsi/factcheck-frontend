import "./Button.scss";

export function ButtonTray({ children }) {
  return <div className="buttonTray">{children}</div>;
}

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
