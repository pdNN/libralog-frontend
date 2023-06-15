import React from "react";
import { Switch } from "react-router-dom";

import Inicio from "pages/Inicio";

import Pag404 from "pages/404";

import Route from "./Route";
import Login from "pages/Login";

import CRUDPerfis from "pages/Cadastros/Perfis";
import CRUDPerfisInterno from "pages/Cadastros/Perfis/interno";

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

    <Route path="/" exact component={Inicio} permissions={[]} />

    <Route
      path="/cadastros/perfis"
      exact
      component={CRUDPerfis}
      permissions={[]}
    />
    <Route
      path="/cadastros/perfis/:id"
      exact
      component={CRUDPerfisInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/distribuidoras"
      exact
      component={CRUDDistribuidoras}
      permissions={[]}
    />
    <Route
      path="/cadastros/distribuidoras/:id"
      exact
      component={CRUDDistribuidorasInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/usuarios"
      exact
      component={CRUDUsuarios}
      permissions={[]}
    />
    <Route
      path="/cadastros/usuarios/:id"
      exact
      component={CRUDUsuariosInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/bancas"
      exact
      component={CRUDBancas}
      permissions={[]}
    />
    <Route
      path="/cadastros/bancas/:id"
      exact
      component={CRUDBancasInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/entregadores"
      exact
      component={CRUDEntregadores}
      permissions={[]}
    />
    <Route
      path="/cadastros/entregadores/:id"
      exact
      component={CRUDEntregadoresInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/editoras"
      exact
      component={CRUDEditoras}
      permissions={[]}
    />
    <Route
      path="/cadastros/editoras/:id"
      exact
      component={CRUDEditorasInterno}
      permissions={[]}
    />

    <Route
      path="/cadastros/revistas"
      exact
      component={CRUDRevistas}
      permissions={[]}
    />
    <Route
      path="/cadastros/revistas/:id"
      exact
      component={CRUDRevistasInterno}
      permissions={[]}
    />

    <Route component={Pag404} />
  </Switch>
);

export default Routes;
