import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRouter({ children, requiredRoles = [] }) {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRoles.length > 0) {
    const userRoles = user.role?.map((r) => r.name) || [];
    const hasRole = requiredRoles.some((r) => userRoles.includes(r));

    if (!hasRole) {
      return <Navigate to="/403" replace />;
    }
  }

  return children;
}
