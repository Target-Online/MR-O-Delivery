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
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import MobileLogin from "views/LoginPage/MobileLogin.js";
import DashBoard from "views/DashBoard/DashBoard.js";
import DriversList from "views/DashBoard/Sections/Drivers/List.js";

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
        <Route path="/verification" component={MobileLogin} />
        <Route path="/drivers" component={DriversList} />
      </Switch>
    </Router>
    <ToastContainer />
  </Store>,
  document.getElementById("root")
);
