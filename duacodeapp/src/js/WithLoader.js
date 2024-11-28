import React from "react";
import Loader from "./loader";

const WithLoader = ({ isLoading, children }) => {
  return isLoading ? <Loader /> : children;
};

export default WithLoader;