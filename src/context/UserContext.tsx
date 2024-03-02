import { createContext } from "react";

type User = {
  isAuthenticated: boolean;
  user: {
    name: string;
    email: string;
  };
};

const UserContext = createContext<User | null>(null);

export default UserContext;
