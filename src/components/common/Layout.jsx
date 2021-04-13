import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Provider } from "react-redux";
import store from '../../store';
import GenericErrorHandler from "../genericErrorHandler";
import Modal from "./modal/Modal";
import Navbar from "./Navbar";

const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(query);

  const title = data.site.siteMetadata?.title || `Title`;

  return (
    <Provider store={store}>
      <GenericErrorHandler />
      <div className="d-flex flex-column pb-4">
        <Navbar brand={title} />
        {children}
      </div>
      <Modal />
    </Provider>
  );
};

export default Layout;
