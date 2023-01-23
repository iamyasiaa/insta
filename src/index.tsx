import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";

import { setupStore } from "./store";
import MainRout from "./route";

import "./style/index.scss";

const firebaseConfig = {
  apiKey: "AIzaSyDHF0BCI30u7hWek098xDyJRmu79Dvbg9Y",
  authDomain: "insta-e0c00.firebaseapp.com",
  projectId: "insta-e0c00",
  storageBucket: "insta-e0c00.appspot.com",
  messagingSenderId: "743078641278",
  appId: "1:743078641278:web:a0d34c87854b289186222f",
  measurementId: "G-KBKWXBWJF0",
};

const app = initializeApp(firebaseConfig);

const store = setupStore();

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
