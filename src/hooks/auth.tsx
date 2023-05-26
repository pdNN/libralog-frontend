import { IUsuarioDTO } from "dtos/IUsuarioDTO";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useState,
  useContext,
} from "react";
import api from "services/api";

interface AuthState {
  token: string;
  usuario: IUsuarioDTO;
}

interface SignInCredentials {
  email_usuario: string;
  des_senha: string;
}

interface AuthContextData {
  usuario: IUsuarioDTO;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@LibraLog:token");
    const usuario = localStorage.getItem("@LibraLog:usuario");

    if (token && usuario) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, usuario: JSON.parse(usuario) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email_usuario, des_senha }: SignInCredentials) => {
      const res = await api.post("sessions", { email_usuario, des_senha });

      const { token, usuario } = res.data;

      localStorage.setItem("@LibraLog:token", token);
      localStorage.setItem("@LibraLog:usuario", JSON.stringify(usuario));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, usuario });
    },
    [],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@LibraLog:token");
    localStorage.removeItem("@LibraLog:usuario");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario: data.usuario, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
