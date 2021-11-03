import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { store } from '../src/redux/store'
import { Provider } from 'react-redux'
import { MoralisProvider } from "react-moralis";


const APP_ID = "juLf4FWikUo0NFgsKNzp2KPUKLbjuuhutf57r0f7";
const SERVER_URL = "https://sukpptp3mu22.usemoralis.com:2053/server";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
