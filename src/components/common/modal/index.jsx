import React, { useEffect } from "react";
import { Modal as BSModal } from "react-bootstrap";
import { createPortal } from "react-dom";

const isBrowser = typeof window !== "undefined";
const parent = isBrowser ? document.body : null;
const root = isBrowser ? document.createElement("div") : null;

/**
 *
 */
const Modal = ({ isOpen, onClose, children }) => {
  // Bootstrap body class to prevent page scroll.
  const bodyClass = "modal-open";

  useEffect(() => {
    if (!isBrowser) return;
    // Add/remove body css class when the modal open state changes.
    if (isOpen) {
      if (!document.body.classList.contains(bodyClass))
        document.body.classList.add(bodyClass);
    } else {
      if (document.body.classList.contains(bodyClass))
        document.body.classList.remove(bodyClass);
    }

    // Clean up on unmount
    return () => {
      if (document.body.classList.contains(bodyClass))
        document.body.classList.remove(bodyClass);

      if (parent && parent.contains(root)) parent.removeChild(root);
    };
  }, [isOpen]);

  return createPortal(
    <BSModal show={isOpen} onHide={onClose}>
      {children}
    </BSModal>,
    root
  );
};

export default Modal;
