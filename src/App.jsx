import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/Helpers/RootLayout";
import "./App.css";
import Home from "./pages/home/home";
import Cerokm from "./pages/categoria-producto/0km/Cerokm";
import LandingPage from "./components/landing/LandingPage";
import AddCars from "./pages/create/AddCars";
import About from "./pages/about/About";
import Detail from "./pages/detail/detail";
import OurTeam from "./pages/ourteam/Ourteam";
import Contact from "./pages/contact/Contact";
import Checkout from "./pages/checkout/Checkout";
import Dashboard from "./pages/dashboard/Dashboard";
import { ContextProvider } from "./contexts/ContextProvider";
import SignUpPage from "./pages/sing-up/[[...sign-up]]/sing-up";

function App() {
  const root = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <LandingPage /> },
        {
          path: "/home",
          element: <Home />,
        },
        { path: "/categoria-producto/0km", element: <Cerokm /> },
        { path: "/categoria-producto/0km/detail/:id", element: <Detail /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/about", element: <About /> },
        { path: "/about/ourteam", element: <OurTeam /> },
        { path: "/about/contact", element: <Contact /> },
        { path: "/create", element: <AddCars /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/sing-up", element: <SignUpPage /> },
      ],
    },
  ]);
  return (
    <>
      <ContextProvider>
        <div className="App">
          <RouterProvider router={root} />
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
