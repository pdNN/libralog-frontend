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

import CRUDBancas from "pages/Cadastros/Bancas";
import CRUDBancasInterno from "pages/Cadastros/Bancas/interno";

import CRUDEntregadores from "pages/Cadastros/Entregadores";
import CRUDEntregadoresInterno from "pages/Cadastros/Entregadores/interno";

import CRUDEditoras from "pages/Cadastros/Editoras";
import CRUDEditorasInterno from "pages/Cadastros/Editoras/interno";

import CRUDRevistas from "pages/Cadastros/Revistas";
import CRUDRevistasInterno from "pages/Cadastros/Revistas/interno";

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

    <Route path="/cadastros/bancas" exact component={CRUDBancas} isAdmin />
    <Route
      path="/cadastros/bancas/:id"
      exact
      component={CRUDBancasInterno}
      isAdmin
    />

    <Route
      path="/cadastros/entregadores"
      exact
      component={CRUDEntregadores}
      isAdmin
    />
    <Route
      path="/cadastros/entregadores/:id"
      exact
      component={CRUDEntregadoresInterno}
      isAdmin
    />

    <Route path="/cadastros/editoras" exact component={CRUDEditoras} isAdmin />
    <Route
      path="/cadastros/editoras/:id"
      exact
      component={CRUDEditorasInterno}
      isAdmin
    />

    <Route path="/cadastros/revistas" exact component={CRUDRevistas} isAdmin />
    <Route
      path="/cadastros/revistas/:id"
      exact
      component={CRUDRevistasInterno}
      isAdmin
    />

    <Route component={Pag404} isPrivate />
  </Switch>
);

export default Routes;
