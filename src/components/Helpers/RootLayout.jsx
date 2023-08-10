import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Nav from "../nav/nav";
import { useAuth0 } from "@auth0/auth0-react";
import AuthMiddleware from "./AuthMiddleware";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {/* {pathname !== "/" && (
        <AuthMiddleware>
          <Nav />
        </AuthMiddleware>
      )} */}
      {/* <main style={{ display: "block" }}>
        <Outlet />
      </main>
      <Footer /> */}

      {pathname !== "/" && pathname !== "/dashboard" && <Nav />}
      <main style={{ display: "block" }}>
        <Outlet />
      </main>
<<<<<<< HEAD
     {pathname !== "/dashboard" && <Footer/>}

=======
      {pathname !== "/dashboard" && <Footer />}
>>>>>>> 69491b611208dd090593234f4b424e3f08457c71
    </>
  );
};

export default RootLayout;
