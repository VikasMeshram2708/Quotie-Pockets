import { createContext } from "react";

type User = {
  isAuthenticated: boolean;
  Logout: () => void;
  user: {
    name: string;
    email: string;
  };
};

const UserContext = createContext<User | null>(null);

export default UserContext;
