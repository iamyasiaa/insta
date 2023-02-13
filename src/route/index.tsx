import React from "react";
import { Route, Routes } from "react-router-dom";

import AuthContext from "@context/AuthContext";
import { ROUTES } from "./path";
import {
  Profile,
  Main,
  Auth,
  Favourites,
  Registration,
  Search,
  AnotherUser,
} from "@/pages/index";
import { Body, MainBody } from "@components/index";
import PrivateRoute from "@/route/PrivateRoute";

export default function MainRout() {
  return (
    <AuthContext>
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
          path={ROUTES.registration}
          element={
            <Body>
              <Registration />
            </Body>
          }
        />
        <Route path={ROUTES.main} element={<PrivateRoute />}>
          <Route
            path={ROUTES.search}
            element={
              <MainBody>
                <Search />
              </MainBody>
            }
          />
          <Route
            path={ROUTES.anotheUser}
            element={
              <Body>
                <AnotherUser />
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
            path={ROUTES.favourites}
            element={
              <MainBody>
                <Favourites />
              </MainBody>
            }
          />
          <Route
            path={ROUTES.news}
            element={
              <MainBody>
                <Main />
              </MainBody>
            }
          />
        </Route>
      </Routes>
    </AuthContext>
  );
}
