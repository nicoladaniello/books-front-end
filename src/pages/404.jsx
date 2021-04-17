import { Link } from "gatsby";
import React from "react";
import Layout from '../components/common/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <h1>404</h1>
      <p>Page not found. <Link to="/">Go back</Link>.</p>
    </Layout>
  );
};

export default NotFoundPage;
