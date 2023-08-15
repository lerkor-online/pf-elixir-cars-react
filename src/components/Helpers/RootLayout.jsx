import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Nav from "../nav/nav";
import { useAuth0 } from "@auth0/auth0-react";
import AuthMiddleware from "./AuthMiddleware";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
     {(pathname !== "/" && pathname.includes("/dashboard")) || <Nav />}
      <main className=" flex-grow" style={{ display: "block" }}>
        <Outlet />
      </main>
<<<<<<< HEAD
      <Footer />

      {pathname !== "/" && pathname !== "/dashboard" && <Nav />}
      <main style={{ display: "block" }}>
        <Outlet />
      </main>
      {pathname !== "/dashboard" && <Footer />}
=======
      {(pathname !== "/dashboard" && pathname.includes("/dashboard_1")) || (
        <Footer />
      )}
>>>>>>> 6e86121b8731642a493407fe8cb965483ddac630
    </>
  );
};

export default RootLayout;

{/* {(pathname !== "/" && pathname.includes("/dashboard")) || <Nav />}
<main style={{ display: "block" }}>

{pathname !== "/" && pathname !== "/dashboard" && <Nav />}
<main className=" flex-grow" style={{ display: "block" }}>
  <Outlet />
</main>
{(pathname !== "/dashboard" && pathname.includes("/dashboard_1")) || (
  <Footer />
)} */}