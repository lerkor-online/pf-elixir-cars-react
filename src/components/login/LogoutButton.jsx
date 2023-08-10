import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

<<<<<<< HEAD
export default LogoutButton;
=======
export default LogoutButton;
>>>>>>> 69491b611208dd090593234f4b424e3f08457c71
