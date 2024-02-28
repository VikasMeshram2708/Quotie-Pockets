/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAuthenticated} = useAuth0();

  const navigate = useNavigate();
  console.log('pt-u', user);

  useEffect(() => {
    if (user === undefined) {
      navigate("/signin", {
        replace: true,
      });
    }
  }, [isAuthenticated]);

  return children;
}
