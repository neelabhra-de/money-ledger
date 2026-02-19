import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./Loader";

export default function SystemRoute({ children }) {
  const { isAuthenticated, isSystemUser, checkingRole } = useAuth();

  if (checkingRole) return <Loader text="Checking system access..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isSystemUser) return <Navigate to="/dashboard" replace />;

  return children;
}
