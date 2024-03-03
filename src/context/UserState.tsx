import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import UserContext from "./UserContext";
import { parseCookies, destroyCookie } from "nookies";

const UserState = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   check if the cookies is there or not
  const cookieValue = parseCookies();

  // Logout Function
  const Logout = () => {
    console.log("logout-clicked");
    setIsAuthenticated(false);
    destroyCookie(null, "quotieAuth");
    window.location.href = "/";
  };

  useMemo(() => {
    if (cookieValue?.quotieAuth === undefined) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [cookieValue?.quotieAuth]);

  useEffect(() => {
    if (window.location.pathname === "/signin" && isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const user = {
    name: "vikas",
    email: "vikas@gmail.com",
  };
  return (
    <UserContext.Provider value={{ user, isAuthenticated, Logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;

export const UserContextProvider = () => {
  const useUser = useContext(UserContext);

  if (!useUser) {
    throw new Error("UserContextProvider must be used with provider.");
  }
  return useUser;
};
