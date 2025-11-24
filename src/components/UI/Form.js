import "./Form.scss";
import Action from "./Actions.js";

export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation --------------------------------
  // State -----------------------------------------
  // Handlers --------------------------------------
  const handleSubmit = () => {
    onSubmit();
  }

  const handleCancel = () => {
    onCancel();
  }
  // View ------------------------------------------
  return (
    <form className="Form Bordered">
      <div className="FormTray">{children}</div>
      <Action.Tray>
        <Action.Add
          showText
          buttonText={"Submit record"}
          onClick={handleSubmit}
        />
        <Action.Cancel showText buttonText={"Cancel"} onClick={handleCancel} />
      </Action.Tray>
    </form>
  );
}

function Item({ children, label, htmlFor, advice, error }) {
  // Initialisation --------------------------------
  // State -----------------------------------------
  // Handlers --------------------------------------
  // View ------------------------------------------
  return (
    <div className="FormItem">
      <label className="FormLabel" htmlFor={htmlFor}>
        {label}
      </label>
      {advice && <p className="FormAdvice">{advice}</p>}
      {children}
      {error && <p className="FormError">{error}</p>}
    </div>
  );
}

// Compose from object

Form.Item = Item;
