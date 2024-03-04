import { createContext } from "react";

type UserData = {
  user?: {
    name: string;
    age: string;
  };

  getUserDetails: { name: string; age: string };
};
export const UserContext = createContext<UserData | null>(null);
