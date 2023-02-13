import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ROUTES } from "@/route/path";
import { usePosition } from "@/hooks/usePosition";
import { useNavigate, useLocation } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "@/index";
import { useAppDispatch } from "@/store";
import { getLocationUser, userActions } from "@/ducks/user";

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
  const position: any = usePosition();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [context, setContext] = useState<IContext>({
    isAuth: !!localStorage.getItem("token"),
  });

  const signOut = () => {
    setContext({ isAuth: false });
  };

  const signIn = async (email: string, password: string) => {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        if (data.user.email) {
          localStorage.setItem("token", data.user.email);
          setContext({ isAuth: true });
          navigate(ROUTES.news);
        }
      })
      .catch(console.error);

    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val().user;
      if (data && data?.length) {
        data.map((item: any) => {
          if (item.email === email) {
            dispatch(
              userActions.setStateUser({
                name: item.name,
                photo: item.photo,
                email,
              })
            );
          }
        });
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      onValue(ref(db), async (snapshot) => {
        const data = snapshot.val().user;
        if (data && data?.length) {
          data.map((item: any) => {
            if (item.email === localStorage.getItem("token")) {
              dispatch(
                userActions.setStateUser({
                  name: item.name,
                  photo: item.photo,
                  email: item.email,
                })
              );
            }
          });
        }
      });
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (localStorage.getItem("token") && location.pathname === ROUTES.main) {
      navigate(ROUTES.news);
    }
  }, [location]);

  useEffect(() => {
    if (position?.latitude && position?.longitude) {
      dispatch(
        getLocationUser({ lat: position?.latitude, lng: position?.longitude })
      );
    }
  }, [position?.latitude, position?.longitude]);

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
