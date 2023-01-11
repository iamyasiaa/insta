import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./path";
import Footer from "@common/Footer";
import Profile from "@/pages/Profile";
import Main from "@/pages/Main";
import Body from "@common/Body";
import Auth from "@/pages/Auth";

export default function MainRout() {
  return (
    <div>
      <Routes>
        <Route
          path={ROUTES.profile}
          element={
            <Body>
              <Profile />
            </Body>
          }
        />
        <Route
          path={ROUTES.main}
          element={
            <Body>
              <Auth />
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
    </div>
  );
}
