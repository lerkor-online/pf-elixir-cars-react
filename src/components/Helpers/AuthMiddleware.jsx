/* import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthMiddleware = ({ children }) => {
  const isAuthenticated = localStorage.getItem("Usuario"); // Tu lógica para determinar si el usuario está autenticado
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir a la página de inicio de sesión
      navigate("sing-up");
    }
  }, [isAuthenticated, navigate]);

  // Renderizar el contenido de las rutas protegidas si el usuario está autenticado
  return isAuthenticated ? children : null;
};

export default AuthMiddleware;
 */