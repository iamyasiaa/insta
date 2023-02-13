import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { MyContext } from "@context/AuthContext";
import { ROUTES } from "@/route/path";

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = useContext(MyContext);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.main} replace state={{ from: location }} />
  );
}
