import { FC, ReactNode } from "react";

import { AuthProvider } from "./auth";

interface IAppProvider {
  children: ReactNode;
}

const AppProvider: FC<IAppProvider> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;
