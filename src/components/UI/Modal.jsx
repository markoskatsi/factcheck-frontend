import { useState } from "react";
import "./Modal.scss";

export function Modal({ show, title, modalPaneClass, children }) {
  // Initialisations -----------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return show ? (
    <div className="ModalOverlay">
      <div className={`ModalPane ${modalPaneClass}`}>
        <header>
          <p>{title}</p>
        </header>
        <main className="ModalMain">{children}</main>
      </div>
    </div>
  ) : null;
}

export function useModal(isOpen, initialContent = null) {
  // Initialisations -----------------------------
  // State ---------------------------------------
  const [state, setState] = useState({
    show: isOpen,
    content: initialContent,
    title: "",
  });

  // Handlers ------------------------------------
  const open = (content, title = "") =>
    setState({ show: true, content, title });
  const close = () => setState({ ...state, show: false });

  // Return --------------------------------------
  return [state.show, state.content, state.title, open, close];
}
