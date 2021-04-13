import React from "react";
import { Spinner as BSSpinner } from "react-bootstrap";

const Spinner = (props) => {
  return (
    <BSSpinner {...props} animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </BSSpinner>
  );
};

export default Spinner;
