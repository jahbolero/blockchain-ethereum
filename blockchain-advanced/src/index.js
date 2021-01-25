import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import data from "../src/services/dataLoad";

ReactDOM.render(
  <Router>
    <App></App>
  </Router>,

  document.getElementById("root")
);
