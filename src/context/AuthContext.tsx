import React, { createContext, useState, ReactNode } from "react";

interface IContextProvider {
  isAuth?: boolean;
  signIn?: () => void;
  signOut?: () => void;
}

interface IContext {
  isAuth: boolean;
}

interface IAuthContext {
  children: ReactNode;
}

export const MyContext = createContext<IContextProvider>({});

export default function AuthContext({ children }: IAuthContext) {
  const [context, setContext] = useState<IContext>({
    isAuth: false,
  });

  const signOut = () => {
    setContext({ isAuth: false });
  };

  const signIn = () => {
    setContext({ isAuth: true });
  };

  return (
    <MyContext.Provider
      value={{
        isAuth: context.isAuth,
        signOut,
        signIn,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
