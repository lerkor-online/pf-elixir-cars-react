import { Outlet, useLocation } from "react-router-dom";
import Footer from "../footer/footer";
import Nav from "../nav/nav";

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <>
      {pathname !== "/" && <Nav/>}
      <main style={{ display: "block" }}>
        <Outlet />
      </main>
      <Footer/>
    </>
  )
};

export default RootLayout;