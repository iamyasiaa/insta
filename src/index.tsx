import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { setupStore } from "./store";
import MainRout from "./route";
import { firebaseConfig } from "./utils/firebase";

import "./style/index.scss";

const app = initializeApp(firebaseConfig);

const store = setupStore();

export const db = getDatabase(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRout />
    </BrowserRouter>
  </Provider>
);
