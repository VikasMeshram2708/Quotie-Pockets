import { parseCookies } from "nookies";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cookiesValue = parseCookies(null, "quotieAuth");

  useEffect(() => {
    if (cookiesValue.quotieAuth === undefined) {
      navigate("/signin");
    }
  }, [cookiesValue, navigate, pathname]);

  return <section>{cookiesValue.quotieAuth !== undefined && children}</section>;
}
