import React from "react";
import classnames from "classnames";
import { Link } from "gatsby";

const NavMenuItem = ({
  label,
  to,
  className,
  children,
  isFolder,
  ...props
}) => {
  const classes = classnames(className, isFolder ? "folder" : "file");

  return (
    <li className={classes} {...props}>
      {to ? (
        <Link
          className="icon"
          activeClassName="active"
          to={to}
          children={label}
        />
      ) : (
        <span className="icon">{label}</span>
      )}
      {children}
    </li>
  );
};

export default NavMenuItem;
