import React, { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = useContext(authContext);
  if (loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivetRoutes;
