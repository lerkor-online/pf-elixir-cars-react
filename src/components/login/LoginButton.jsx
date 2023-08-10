import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup, user, getAccessTokenSilently, isAuthenticated } =
    useAuth0();

  return <button onClick={() => loginWithPopup()}>Login</button>;
};

export default LoginButton;