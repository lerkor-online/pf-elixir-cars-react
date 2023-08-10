import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./contexts/cart.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
// import { UserProvider } from "./contexts/UserContext.jsx";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: `https://${domain}/api/v2/`,
      scope: "read:current_user update:current_user_metadata",
    }}
  >
    {/* <UserProvider> */}
    <CartProvider>
      <App />
    </CartProvider>
    {/* </UserProvider> */}
  </Auth0Provider>
);
