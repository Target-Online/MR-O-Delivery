//import "assets/scss/material-kit-react.scss?v=1.8.0";
//import "@patternfly/react-core/dist/styles/base.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import DashBoard from "views/DashBoard/DashBoard.js";
import LoginPage from "views/LoginPage/LoginPage.js";

// Data Store
import Store from "Store.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Store>
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/components" component={Components} />
      </Switch>
    </Router>
    <ToastContainer />
  </Store>,
  document.getElementById("root")
);
