import {
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../config/firebase";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: async (email: string, password: string) => {},
  logout: () => {},
  register: async (email: string, password: string, displayName: string) => {},
});

interface AuthContextProps extends PropsWithChildren {
  name?: string;
}

const AuthContextProvider = ({ children, name }: AuthContextProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const register = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return updateProfile(userCredential.user, {
        displayName: displayName,
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user !== null);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
