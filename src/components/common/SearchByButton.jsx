import React from "react";
import { Button } from "react-bootstrap";
import classnames from "classnames";

const SearchByButton = ({ input, onClick, children }) => (
  <Button
    variant={input ? "primary-light" : "light"}
    className={classnames(["mr-2", { "no-print": !input }])}
    onClick={() => onClick()}
  >
    {children}
  </Button>
);

export default SearchByButton;
