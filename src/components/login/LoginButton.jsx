<<<<<<< HEAD
import { useAuth0 } from "@auth0/auth0-react";
=======
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { useUser } from "../../hooks/useUser";
>>>>>>> 69491b611208dd090593234f4b424e3f08457c71

const LoginButton = () => {
  const { loginWithPopup, user, getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  return <button onClick={() => loginWithPopup()}>Login</button>;
};

<<<<<<< HEAD
export default LoginButton;
=======
export default LoginButton;
>>>>>>> 69491b611208dd090593234f4b424e3f08457c71
