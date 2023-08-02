import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AppContext = createContext();

export const useAuth = () => {
  const context = useContext(AppContext);
  return context;
};

const ContextProvider = ({ children }) => {
  ///////////////////FIREBASE AUTH///////////////////////////////////////
  const [user, setUser] = useState(null);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    signOut(auth);
  };

  const provider = new GoogleAuthProvider();

  const loginwithgoogle = async () => {
    // signInWithRedirect(auth, googleProvider);
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  ////////////////////////////////////////////////////////////////////////////////////

  const [activeMenu, setActiveMenu] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentColor, setCurrentColor] = useState(""); // Colocar el valor inicial del color según corresponda
  const [currentMode, setCurrentMode] = useState(""); // Colocar el valor inicial del modo según corresponda

  return (
    <AppContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        themeSettings,
        setThemeSettings,
        currentColor,
        setCurrentColor,
        currentMode,
        setCurrentMode,
        user,
        signup,
        login,
        logout,
        loginwithgoogle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
