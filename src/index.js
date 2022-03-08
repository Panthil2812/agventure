import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import Router from "./Router";
// import Navbar from "./navbar";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
