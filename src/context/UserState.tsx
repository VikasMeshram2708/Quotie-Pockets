/* eslint-disable react-hooks/rules-of-hooks */
import { LoginSchemaType, UserContext } from "./UserContext";
import { ReactNode, useContext } from "react";

type childrenWithProps = {
  children: ReactNode;
};

export type ContactDataType = {
  name: string;
  email: string;
  message: string;
};

export const UserState = ({ children }: childrenWithProps) => {
  const storeContactDetails = (data: ContactDataType) => {
    console.log("contact-data", data);
  };

  const storeLoginDetails = (data: LoginSchemaType) => {
    console.log("login-data", data);
  };

  return (
    <UserContext.Provider value={{ storeContactDetails, storeLoginDetails }}>
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
