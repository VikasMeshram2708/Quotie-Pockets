/* eslint-disable react-hooks/rules-of-hooks */
import { UserContext } from "./UserContext";
import { ReactNode, useContext, useMemo } from "react";

type childrenWithProps = {
  children: ReactNode;
};

export const UserState = ({ children }: childrenWithProps) => {
  const getUserDetails = useMemo(() => {
    const user = {
      name: "Vikas Meshram",
      age: "23",
    };
    return user;
  }, []);
  return (
    <UserContext.Provider value={{ getUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export function UserUserContext() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("User context must be wrapped in Proivder");
  }

  return user;
}
