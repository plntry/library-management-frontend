import { Navigate, Outlet } from "react-router";
import { UserRoles } from "../models/User";
import { PATHS } from "../routes/paths";

const ProtectedRoute: React.FC<{
  allowedRoles: readonly string[];
  children?: React.ReactNode;
}> = ({ allowedRoles, children }) => {
  const role = UserRoles.LIBRARIAN; // TODO: add role after login

  if (!allowedRoles.includes(role)) {
    return <Navigate to={PATHS.HOME.link} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
