import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth } from "../firebase";

const AppContext = createContext();

export const useAuth = () => {
  const context = useContext(AppContext);
  return context;
};

const ContextProvider = ({ children }) => {
  ///////////////////FIREBASE AUTH///////////////////////////////////////
  const [user, setUser] = useState();

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        auth.signOut();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const provider = new GoogleAuthProvider();

  const loginwithgoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
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
