import { FC, useCallback, useEffect, useState } from "react";
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

import AuthLayout from "pages/_layouts/auth/index";
import DefaultLayout from "pages/_layouts/default";

import { useAuth } from "../hooks/auth";

interface RouteProps extends ReactDOMRouteProps {
  permissions?: string[];
  component: any;
}

const Route: FC<RouteProps> = ({
  permissions = [],
  component: Component,
  ...rest
}) => {
  const auth = useAuth();
  const { usuario } = auth;
  const [redirect, setRedirect] = useState<number>(0);

  const handleRedirect = useCallback(() => {
    // 1 - login / 2 - inicio / 0 - normal;
    if (usuario && !permissions) {
      console.log(1);
      setRedirect(2);
    } else if (!usuario && !permissions) {
      console.log(2);
      setRedirect(1);
    } else if (usuario && permissions && permissions.length > 0) {
      console.log(3);
      const hasPermission = permissions.some((permission) => {
        return (
          usuario.perfil.permissoes.includes(permission) ||
          usuario.perfil.permissoes.includes("super")
        );
      });

      if (!hasPermission) {
        setRedirect(2);
      }
    } else {
      console.log(4);
      setRedirect(0);
    }
  }, [permissions, usuario]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        switch (redirect) {
          case 1:
            return (
              <Redirect
                to={{ pathname: "/login", state: { from: location } }}
              />
            );
          case 2:
            return (
              <Redirect to={{ pathname: "/", state: { from: location } }} />
            );
          default:
            break;
        }

        if (!usuario && location.pathname !== "/login") {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }

        const Layout = usuario ? AuthLayout : DefaultLayout;

        return (
          <Layout>
            <Component />
          </Layout>
        );
      }}
    />
  );
};

export default Route;
