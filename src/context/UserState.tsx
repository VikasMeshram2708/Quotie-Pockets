/* eslint-disable react-hooks/rules-of-hooks */
import { LoginSchemaType, UserContext } from "./UserContext";
import { ReactNode, useContext, useEffect } from "react";
const URI = process.env.REACT_APP_BASE_URI;

type childrenWithProps = {
  children: ReactNode;
};

export type ContactDataType = {
  name: string;
  email: string;
  message: string;
};

export const UserState = ({ children }: childrenWithProps) => {
  const storeContactDetails = async (data: ContactDataType) => {
    try {
      const response = await fetch(`${URI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        return alert(result?.message);
      }
      return alert(
        "Thank you for contacting with us. Our team will contact you soon."
      );
    } catch (e) {
      const err = e as Error;
      console.log(err?.message);
      return alert(err?.message);
    }
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
