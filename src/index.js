import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import {
  BrowserRouter as Router
} from "react-router-dom";

import { Provider } from "react-redux";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import { store } from "../src/redux/store";

import reportWebVitals from "./reportWebVitals";
import App from "./App";



const getLibrary = provider => {
  return new Web3(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
