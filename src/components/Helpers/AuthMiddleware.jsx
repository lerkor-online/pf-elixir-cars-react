import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate("/");
    return;
  }
  return isAuthenticated ? children : null;
};

export default AuthMiddleware;
