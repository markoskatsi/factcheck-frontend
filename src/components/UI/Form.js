import Action from "./Actions.js";
import { useState } from "react";
import "./Form.scss";

export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation --------------------------------
  // State -----------------------------------------
  // Handlers --------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleCancel = () => {
    onCancel();
  };
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

function useForm(initialRecord, conformance, { isValid, errorMessage }) {
  // Initialisation --------------------------------
  // State -----------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(initialRecord).reduce(
      (accum, key) => ({
        ...accum,
        [key]: null,
      }),
      {}
    )
  );
  // Handlers --------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = conformance.includes(name) ? parseInt(value) : value;
    setRecord({ ...record, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
  };
  // View ------------------------------------------
  return [record, errors, setErrors, handleChange];
}

// Compose from object

Form.Item = Item;
Form.useForm = useForm;
