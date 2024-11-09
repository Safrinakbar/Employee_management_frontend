import React from "react";
import { useAuth } from "../../../server/context/authContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Return loading state
  }

  return user ? children : <Navigate to="/login" />; // Return either children or navigate to login
};

export default PrivateRoutes;
