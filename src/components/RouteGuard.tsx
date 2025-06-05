import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type RouteGuardProps = {
  children: ReactNode;
  isBiz?: boolean;
  isAdmin?: boolean;
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, isBiz, isAdmin } = props;
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isBiz && !user?.isBusiness) {
    return <Navigate to="/" />;
  }

  if (isAdmin && !user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RouteGuard;
