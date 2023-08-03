import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Nav from "../nav/nav";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && pathname !== "/dashboard" && <Nav/>}
      <main style={{ display: "block" }}>
        <Outlet />
      </main>
      {pathname !== "/dashboard" && <Footer/>}
    </>
  )
};

export default RootLayout;