/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const user = {
    name: "Vikas",
  };

  useEffect(() => {
    if (user.name === undefined) {
      navigate("/signin", {
        replace: true,
      });
    }
  }, [navigate, user]);

  return children;
}
