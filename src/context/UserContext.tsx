import { createContext } from "react";
import { ContactDataType } from "./UserState";

export type LoginSchemaType = {
  email: string;
  password: string;
};

type UserData = {
  storeContactDetails: (data: ContactDataType) => void;
  storeLoginDetails: (data: LoginSchemaType) => void;
  isAuthenticated: boolean;
};
export const UserContext = createContext<UserData | null>(null);
