import { Link } from "gatsby";
import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <h1>404</h1>
      <p>
        Page not found. <Link to="/">Go back</Link>.
      </p>
    </>
  );
};

export default NotFoundPage;
