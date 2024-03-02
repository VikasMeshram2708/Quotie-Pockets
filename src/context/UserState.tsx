import { ReactNode, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { parseCookies } from "nookies";

const UserState = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //   check if the cookies is there or not
  const cookieValue = parseCookies();

  useEffect(() => {
    if (cookieValue?.quotieAuth === undefined) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [cookieValue]);
  console.log("isAuthenticated", isAuthenticated);

  const user = {
    name: "vikas",
    email: "vikas@gmail.com",
  };
  return (
    <UserContext.Provider value={{ user, isAuthenticated }}>
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
