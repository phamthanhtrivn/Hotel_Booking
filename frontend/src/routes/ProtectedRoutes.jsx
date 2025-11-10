import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!allowedRoles) return <>{children}</>;

  if (!user) return <Navigate to="/login" replace />;

  if (!allowedRoles.includes(user.vaiTro)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoutes;
