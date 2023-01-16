import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./path";
import Profile from "@/pages/Profile";
import Main from "@/pages/Main";
import Body from "@common/Body";
import Auth from "@/pages/Auth";

interface IContextProvider {
  login?: string | null;
  password?: string | null;
  isAuth?: boolean | null;
  newState?: (context: IContext) => void;
}

interface IContext {
  login?: string | null;
  password?: string | null;
  isAuth?: boolean | null;
}

export const MyContext = createContext<IContextProvider>({});

export default function MainRout() {
  const [context, setContext] = useState<IContext>({
    login: null,
    password: null,
    isAuth: false,
  });

  const newState = (state: IContext) => {
    setContext(state);
  };

  return (
    <MyContext.Provider
      value={{
        login: context.login,
        password: context.password,
        isAuth: context.isAuth,
        newState,
      }}
    >
      <Routes>
        <Route
          path={ROUTES.main}
          element={
            <Body>
              <Auth />
            </Body>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <Body>
              <Profile />
            </Body>
          }
        />
        <Route
          path={ROUTES.lenta}
          element={
            <Body>
              <Main />
            </Body>
          }
        />
      </Routes>
    </MyContext.Provider>
  );
}
