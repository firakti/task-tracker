import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import firebaseConfig from "./utils/firebase-config"
import { FirebaseAppProvider } from "reactfire";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <App />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode >,
  rootElement
);
