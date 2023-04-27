import React from "react";
import { Switch } from "react-router-dom";

import Inicio from "pages/Inicio";

import Pag404 from "pages/404";

import Route from "./Route";
import Login from "pages/Login";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} />

    <Route path="/" exact component={Inicio} isPrivate />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
