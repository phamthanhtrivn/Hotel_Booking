import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  const role = user?.vaiTro || "GUEST";

  if (!allowedRoles) return children;

  if (allowedRoles.includes(role)) return children;

  if (role === "GUEST") {
    return <Navigate to="/login" replace />;
  }

  if (role === "MEMBER") {
    return <Navigate to="/" replace />;
  }

  if (role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoutes;
