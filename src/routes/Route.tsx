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
  isPrivate?: boolean;
  isAdmin?: boolean;
  component: any;
}

const Route: FC<RouteProps> = ({
  isPrivate = false,
  isAdmin = false,
  component: Component,
  ...rest
}) => {
  const auth = useAuth();
  const { usuario } = auth;
  // const [redirect, setRedirect] = useState<number>(0);
  // const [profile, setProfile] = useState<number | null>(null);

  // const handleProfile = useCallback(() => {
  //   if (usuario) {
  //     setProfile(usuario.cod_perfil);
  //   }
  // }, [usuario]);

  // const handleRedirect = useCallback(() => {
  //   let inicial = false;
  //   let admin = false;
  //   if (profile) {
  //     switch (profile) {
  //       case 1:
  //         admin = true;
  //         break;
  //       default:
  //         inicial = true;
  //         break;
  //     }
  //   }

  //   // 1 - login / 2 - inicio / 0 - normal;
  //   if (redirect === 0) {
  //     if ((!usuario && isPrivate) || (!usuario && isAdmin)) {
  //       setRedirect(1);
  //     } else if (!admin && isAdmin) {
  //       setRedirect(1);
  //     } else if (usuario && !isPrivate && !isAdmin) {
  //       setRedirect(2);
  //     }
  //   }
  // }, [redirect, isAdmin, isPrivate, profile, usuario]);

  // useEffect(() => {
  //   handleProfile();
  // }, [handleProfile]);

  // useEffect(() => {
  //   handleRedirect();
  // }, [handleRedirect]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // switch (redirect) {
        //   case 1:
        //     return (
        //       <Redirect
        //         to={{ pathname: "/login", state: { from: location } }}
        //       />
        //     );
        //   case 2:
        //     return (
        //       <Redirect to={{ pathname: "/", state: { from: location } }} />
        //     );
        //   default:
        //     break;
        // }

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
