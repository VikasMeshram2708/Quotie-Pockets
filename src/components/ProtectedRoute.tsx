/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {} from "nookies";
import { UserContextProvider } from "../context/UserState";

type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = UserContextProvider();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/signin", {
        replace: true,
      });
    }
  }, []);

  return children;
}
