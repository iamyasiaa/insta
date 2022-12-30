import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "./path";
import Footer from "../components/common/Footer";
import Profile from "../pages/Profile";
import Main from "../pages/Main";
import Body from "../components/common/Body";

export default function MainRout() {
  return (
    <>
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
              <Main />
            </Body>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
