import { createContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextInterface {
  user: any;
  setUser: Dispatch<SetStateAction<any>>;

}

export const AuthContext = createContext<AuthContextInterface>({
  user: {} as any,
  setUser: () => {},

});

type UserProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<any>({} as any);

  const values = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
