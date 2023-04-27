import React from "react";
import { Switch } from "react-router-dom";

import Inicio from "pages/Inicio";

import Pag404 from "pages/404";

import Route from "./Route";
import Login from "pages/Login";

import CRUDDistribuidoras from "pages/Cadastros/Distribuidoras";
import CRUDDistribuidorasInterno from "pages/Cadastros/Distribuidoras/interno";

import CRUDUsuarios from "pages/Cadastros/Usuarios";
import CRUDUsuariosInterno from "pages/Cadastros/Usuarios/interno";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={Login} />

    <Route path="/" exact component={Inicio} isPrivate />

    <Route
      path="/cadastros/distribuidoras"
      exact
      component={CRUDDistribuidoras}
      isAdmin
    />
    <Route
      path="/cadastros/distribuidoras/:id"
      exact
      component={CRUDDistribuidorasInterno}
      isAdmin
    />

    <Route path="/cadastros/usuarios" exact component={CRUDUsuarios} isAdmin />
    <Route
      path="/cadastros/usuarios/:id"
      exact
      component={CRUDUsuariosInterno}
      isAdmin
    />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
