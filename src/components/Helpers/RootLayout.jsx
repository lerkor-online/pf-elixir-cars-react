import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Nav from "../nav/nav";
import { useAuth0 } from "@auth0/auth0-react";
import AuthMiddleware from "./AuthMiddleware";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && (
        // <AuthMiddleware>
        <Nav />
        // </AuthMiddleware>
      )}
      <main style={{ display: "block" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
