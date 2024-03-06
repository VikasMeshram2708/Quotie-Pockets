/* eslint-disable react-hooks/rules-of-hooks */
import { LoginSchemaType, UserContext } from "./UserContext";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { setCookie, parseCookies } from "nookies";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const storeLoginDetails = async (data: LoginSchemaType) => {
    try {
      const response = await fetch(`${URI}/api/login`, {
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
      setCookie(null, "quotieAuth", result?.user?.userEmail, {
        maxAge: 60 * 60,
      });
      // Set isauthenticated to true when the user has the cookie
      await new Promise(() => {
        return alert(result?.message);
      });
    } catch (e) {
      const err = e as Error;
      console.log(err?.message);
      return alert(err?.message);
    }
  };

  useMemo(() => {
    const UserAuthenticator = () => {
      // check if the user has email in the cookie if has then it's Logged in or not Logged in.
      // const cookiesValue = parseCookies(null, "quotieAuth");
      const cookieValue = document.cookie;
      const cookieItem = parseCookies(null, cookieValue);
      // console.log("middli-ware-authenticator", cookieItem?.quotieAuth);
      if (cookieItem?.quotieAuth === undefined) {
        return;
      }
      return setIsAuthenticated(true);
    };
    UserAuthenticator();
  }, []);

  return (
    <UserContext.Provider
      value={{ storeContactDetails, storeLoginDetails, isAuthenticated }}
    >
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
