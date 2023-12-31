import Boxgold from "../boxgold/boxgold";
import ButtonCart from "../cart/Cart";
import logo from "../../assets/logo_elixir.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../login/LogoutButton";
import LoginButton from "../login/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

import Profile from "../../pages/dashboard_1/components/Perfil/Profile";
import { useState, useEffect } from "react";
import Modal from "../ui/Modal";

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

export default function Nav() {
  const navigate = useNavigate();
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await axios(userDetailsByIdUrl, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const user_metadata = await metadataResponse.data;

        const userFound = await axios.get(
          `${URL}users?email=${user_metadata.email}`

        );
        const userData = {
          name: user_metadata.name,
          email: user_metadata.email,
          password: accessToken,
        };
        console.log(userFound);
        window.localStorage.setItem("user", JSON.stringify(userFound.data))
        if (!userFound.data) {
          await axios.post(`${URL}register`, userData);
        }
        await axios.post(`${URL}login`, userData);
      } catch (e) {
        console.log(e.message);
      }
    };

    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

  const handleCarrito = () =>{
    navigate("/carrito")
  }

  const onClickHandle = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <main>
      <header
        id="landing-header"
        className="py-4  px-10 flex item-center fixed top-0 w-full justify-between bg-neutral-900 border-b-[3px] border-yellow-600 z-40 "
      >
        <div>
          <a href="/home">
            <img
              src={logo}
              alt="Elixir Logo"
              className="dark:invert"
              width="160px"
              height="56px"
            />
          </a>
        </div>

        <nav className="flex flex-grow justify-center">
          <ul className="flex text-sm [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-2 [&>li>a]:text-gray-50">
            {/* <li>
              <a href="app/categoria-producto/usados">Usados Garantizados</a>
            </li> */}
            <li>
              <a href="/categoria-producto/0km">0 KM y Usados Garantizados</a>
            </li>
            <li>
            <a className="cursor-pointer" onClick={onClickHandle}>
                Vende tu Auto
              </a>
            </li>
            {/* <li>
              <a href="/create">Añadir Auto</a>
            </li> */}
            <li>
              <a href="">Servicios</a>
            </li>
            <li>
              <a href="/about">Nosotros</a>
            </li>
            <li>
              <a href="">Reviews</a>
            </li>
          </ul>
        </nav>
        <nav>
          <div className="pr-8"><button onClick={handleCarrito}>🛒</button></div>
          {/* <ButtonCart /> */}
          </nav>
        {/* <nav className="flex items-start mx-5 -mt-3">
          <div className="relative">
            <ButtonCart />
          </div>
          {/*  <Cart/> 
        </nav> */}

        <nav className="flex items-center">
          <div className="relative">
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          </div>
        </nav>
        <nav className="flex items-center">
          <div className="relative mx-5">
            <Profile />
          </div>
        </nav>
        <Boxgold />

        {/* <button onClick={onLogOut} className="bg-white p-1 rounded-lg ">
          Salir
        </button> */}
      </header>
      {showModal && (
        <Modal
          title="Contactanos a los siguientes numeros para concretar tu venta"
          text="+59833443565, +59833443565"
          setShowModal={setShowModal}
        ></Modal>
      )}
    </main>
  );
}
