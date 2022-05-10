import {
  useEffect,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  FunctionComponent,
} from "react";
import { auth } from "../firebase/config";
import { onIdTokenChanged, signOut } from "firebase/auth";
import { User } from "firebase/auth";

interface IContext {
  user: User | null;
  userIsLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<IContext>({
  user: null,
  userIsLoading: true,
  logout: () => {},
});

interface HeaderProps {
  children: any;
}

const AuthProvider: FunctionComponent<PropsWithChildren<HeaderProps>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userIsLoading, setAuthIsLoading] = useState<boolean>(true);

  /**
   * If the auth token is changed (by loading a page or logging in/out) the user is set accordingly.
   */
  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth, (u) => {
      setUser(u);
      setAuthIsLoading(false);
    });

    return cancelAuthListener;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userIsLoading, logout: () => signOut(auth) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
