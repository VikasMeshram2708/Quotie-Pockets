/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {} from "nookies";
import { UserContextProvider } from "../context/UserState";

type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { pathname } = useLocation();
  console.log("paht", pathname);
  const { isAuthenticated } = UserContextProvider();

  const navigate = useNavigate();
  console.log("curr-path", pathname);

  useEffect(() => {
    if (pathname === "/quotie" && isAuthenticated === false) {
      navigate("/signin", {
        replace: true,
      });
    }

    if (pathname === "/signin" && isAuthenticated === true) {
      navigate("/", {
        replace: true,
      });
    }

    () => {};
  }, [isAuthenticated]);

  return children;
}
