import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ROUTES } from "@/route/path";
import { useNavigate, useLocation } from "react-router-dom";

interface IContextProvider {
  isAuth?: boolean;
  signIn?: (email: string, password: string) => void;
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
  const navigate = useNavigate();
  const location = useLocation();
  const [context, setContext] = useState<IContext>({
    isAuth: localStorage.getItem("token") ? true : false,
  });

  const signOut = () => {
    setContext({ isAuth: false });
  };

  const signIn = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        data.user.getIdToken().then((token) => {
          localStorage.setItem("token", token);
        });
        setContext({ isAuth: true });
        navigate(ROUTES.news);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (localStorage.getItem("token") && location.pathname === ROUTES.main) {
      navigate(ROUTES.news);
    }
  }, [location]);

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
