import Action from "./Actions.js";
import { useState } from "react";
import "./Form.scss";

export default function Form({ children, onSubmit, onCancel }) {
  // Initialisation --------------------------------
  // State -----------------------------------------
  // Handlers --------------------------------------
  const handleSubmit = (e) => {
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

function useForm(
  initialRecord,
  conformance,
  { isValid, errorMessage },
  onSubmit,
  onCancel
) {
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
      [name]: isValid[name]
        ? isValid[name](newValue)
          ? null
          : errorMessage[name]
        : null,
    });
  };

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(record).forEach((key) => {
      if (isValid[key]) {
        if (isValid[key](record[key])) {
          errors[key] = null;
        } else {
          errors[key] = errorMessage[key];
          isRecordValid = false;
        }
      }
    });
    return isRecordValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValidRecord(record) && onSubmit(record);
    setErrors({ ...errors });
  };

  const handleCancel = () => {
    onCancel();
  };

  // View ------------------------------------------
  return [record, errors, handleChange, handleSubmit, handleCancel];
}

// Compose from object

Form.Item = Item;
Form.useForm = useForm;
