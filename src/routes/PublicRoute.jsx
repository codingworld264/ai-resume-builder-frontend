import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { loggedIn } = useSelector((state) => state.user);

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;