import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute enforces authentication and optional role-based access.
 * If user is not authenticated, redirects to /login saving the attempted path.
 * If user's role is not allowed, redirects to their permitted default dashboard.
 */
export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Save attempted location for smooth post-login redirection
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have role access (e.g., seller visiting /buyer/*)
    const fallback =
      user.role === "buyer"
        ? "/buyer/dashboard"
        : user.role === "admin"
        ? "/admin"
        : user.role === "agent"
        ? "/agent"
        : "/seller/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}

function isRolePermittedPath(path, role) {
  if (!path || path === "/" || path === "/login" || path === "/signup") return false;
  if (path.startsWith("/seller") && role !== "seller" && role !== "admin") return false;
  if (path.startsWith("/buyer") && role !== "buyer" && role !== "admin") return false;
  if (path.startsWith("/admin") && role !== "admin") return false;
  if (path.startsWith("/agent") && role !== "agent" && role !== "admin") return false;
  return true;
}

/**
 * PublicOnlyRoute prevents already authenticated users from accessing
 * public-only pages like Login and Signup, redirecting them to their dashboard.
 */
export function PublicOnlyRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    const fromPath = location.state?.from?.pathname;
    const defaultDashboard =
      user.role === "buyer"
        ? "/buyer/dashboard"
        : user.role === "admin"
        ? "/admin"
        : user.role === "agent"
        ? "/agent"
        : "/seller/dashboard";

    const target = isRolePermittedPath(fromPath, user.role)
      ? fromPath
      : defaultDashboard;

    return <Navigate to={target} replace />;
  }

  return children;
}

export default ProtectedRoute;
