import { useState } from "react";
import "./Accordion.scss";
import * as Actions from "./Actions.jsx";

function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${isOpen ? "is-open" : "is-closed"}`}>
      <button
        type="button"
        className="accordion-header"
        title={title}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-action" aria-hidden="true">
          {isOpen ? <Actions.Collapse /> : <Actions.Expand />}
        </span>
      </button>

      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default Accordion;
