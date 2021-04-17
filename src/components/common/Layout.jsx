import React from "react";
import { Provider } from "react-redux";
import store from "../../store";
import GenericErrorHandler from "../genericErrorHandler";
import Modal from "./modal/Modal";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
      <Modal />
      <GenericErrorHandler />
    </Provider>
  );
};

export default Layout;
