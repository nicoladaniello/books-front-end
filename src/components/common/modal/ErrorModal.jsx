import { PropTypes } from "prop-types";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import Icon from "../Icon";
import { useDispatch } from "react-redux";

export const errorTypes = {
  UnauthorizedError: {
    icon: "times",
    title: "Non sei autenticato",
    message: "L'autenticazione è invalida o scaduta, prova a riconnetterti.",
  },
  NetworkError: {
    icon: "times",
    title: "Errore di connessione",
    message:
      "Controlla che il programma sia avviato oppure riavvia il programma e ricarica la pagina.",
  },
  UnexpectedError: {
    icon: "times",
    title: "Errore imprevisto",
    message: "C'è stato un errore imprevisto, prova a riconnetterti e ritenta.",
  },
};

const ErrorModal = ({ type, icon, title, message, action, onClose }) => {
  const dispatch = useDispatch();

  if (type && errorTypes[type]) {
    icon = errorTypes[type].icon;
    title = errorTypes[type].title;
    message = errorTypes[type].message;
  } else console.error("ErrorModal type not found.", type);

  const handleClose = () => {
    if (action) dispatch(action);
    onClose();
  };

  return (
    <>
      <Modal.Body className="pt-0 text-center">
        <p className="display-4">
          <Icon className="text-danger" icon={icon} />
        </p>
        <h4 className="mb-3">{title}</h4>
        {message}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => handleClose()}>
          Chiudi
        </Button>
      </Modal.Footer>
    </>
  );
};

ErrorModal.propTypes = {
  type: PropTypes.oneOf(Object.keys(errorTypes)),
  icon: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

ErrorModal.defaultProps = {
  icon: "times",
};

export default ErrorModal;
