import { Navigate, Outlet } from "react-router";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute: React.FC<{
  allowedRoles: readonly string[];
  children?: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const role = useAuthStore((state) => state.user?.role) || UserRoles.READER;

  if (!allowedRoles.includes(role)) {
    return <Navigate to={PATHS.HOME.link} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
