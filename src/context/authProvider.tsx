import {
  useEffect,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  FunctionComponent,
} from "react";
import { auth } from "../firebase/config"
import { onIdTokenChanged, signOut } from "firebase/auth";
import {User} from "firebase/auth";

interface IContext {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<IContext>({
  user: null,
  logout: () => {},
});

interface HeaderProps{
  children: any;
}

const AuthProvider: FunctionComponent<PropsWithChildren<HeaderProps>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cancelAuthListener = onIdTokenChanged(auth, (u) => {
      setUser(u);
    });

    return cancelAuthListener;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logout: () => signOut(auth) }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
