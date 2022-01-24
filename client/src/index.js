import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
// import $ from "jquery";
// import Popper from "popper.js";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <div className="container-fluid p-5">
    <App />
  </div>,
  document.getElementById("root")
);
