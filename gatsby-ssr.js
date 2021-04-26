import React from "react";
import Layout from "./src/components/Layout";

import "./src/styles/custom.scss";

// Persist Layout on route changes
export const wrapRootElement = ({ element }) => <Layout>{element}</Layout>;