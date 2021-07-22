import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { FavoritesContextProvider } from "./store/context";
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/'


ReactDOM.render(
  // <FavoritesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </FavoritesContextProvider>,
  ,
  document.getElementById("root")
);
