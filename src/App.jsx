import {useState, useEffect } from 'react';
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
import Dashboard from "../src/components/Dashboard/Dashboard";
import AdminDashboard from "./pages/dashboard_1/AdminDashboard";

function App() {
  const root = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      /* errorElement: <Error />, */
      children: [
        { path: "/", element: <LandingPage/> },
        { path: "/home", element: <Home/> },
        { path: "/categoria-producto/0km", element: <Cerokm/> },
        { path: "/categoria-producto/0km/detail/:id", element: <Detail/> },
        { path: "/about", element: <About/> },
        { path: "/about/ourteam", element: <OurTeam/> },
        { path: "/about/contact", element: <Contact/> },
        { path: "/create", element: <AddCars/> },
        { path: "/dashboard", element: <Dashboard/> },
        { path: "/dashboard_1/*", element: <AdminDashboard /> },
        { path: "/checkout", element: <Checkout/> },
      ],
    },
  ]);
  return (
    <>
      <div className="App">
        <RouterProvider router={root} />
      </div>
    </>
  )
}

export default App