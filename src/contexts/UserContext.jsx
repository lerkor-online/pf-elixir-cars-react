import { useReducer, createContext } from "react";
import { userReducer, userInitialState } from "../reducers/userReducer";

// Crea el contexto de usuario
export const UserContext = createContext();

function useUserReducer() {
  const [state, dispatch] = useReducer(userReducer, userInitialState);

  const setUser = (user) =>
    dispatch({
      type: "SET_USER",
      payload: user,
    });

  const clearUser = () =>
    dispatch({
      type: "CLEAR_USER",
    });

  return { state, setUser, clearUser };
}

// Proveedor de contexto de usuario
export const UserProvider = ({ children }) => {
  const { state, setUser, clearUser } = useUserReducer();

  return (
    <UserContext.Provider value={{ state, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// // UserContext.js
// import React, { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userMetadata, setUserMetadata] = useState(null);

//   const login = async (accessToken, user) => {
//     try {
//       const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN; // Reemplaza con tu dominio Auth0
//       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
//       const metadataResponse = await axios(userDetailsByIdUrl, {
//         headers: {
//           Accept: "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const user_metadata = await metadataResponse.data;

//       setUserMetadata(user_metadata);

//       await axios.post("http://localhost:3001/users", {
//         email: user_metadata.email,
//         name: user_metadata.name,
//         password: accessToken,
//       });

//       // Guardar la información en localStorage
//       localStorage.setItem("userMetadata", JSON.stringify(user_metadata));
//       console.log(user_metadata);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ userMetadata, login }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);
