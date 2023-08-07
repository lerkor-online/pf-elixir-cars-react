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
/* import Dashboard from "./pages/dashboard/Dashboard"; */
import { ContextProvider } from "./contexts/ContextProvider";
/* import SignUpPage from "./pages/sing-up/[[...sign-up]]/sing-up"; */

import Dashboard from "../src/components/Dashboard/Dashboard";

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
        /* { path: "/sing-up", element: <SignUpPage /> }, */
      ],
    },
  ]);

  // Lee la variable de entorno desde import.meta.env
  // const clerkPublishableKey = import.meta.env
  //   .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

  // console.log(clerkPublishableKey);
  // // Verifica si la clave existe y no está vacía
  // if (!clerkPublishableKey || clerkPublishableKey === "") {
  //   throw new Error("Missing or empty Publishable Key");
  // }

  // // Usa la variable en tu código
  // const clerkPubKey = clerkPublishableKey;

  // Continúa con el resto de tu código utilizando clerkPubKey

  return (
    <>
      {/* <ClerkProvider publishableKey={clerkPubKey}> */}
      <ContextProvider>
        <div className="App">
          <RouterProvider router={root} />
        </div>
      </ContextProvider>
      {/* </ClerkProvider> */}
    </>
  );
}

export default App;
