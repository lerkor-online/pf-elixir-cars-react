import Boxgold from "../boxgold/boxgold";
import ButtonCart from "../cart/cart";
import logo from "../../assets/logo_elixir.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuth } from "../../contexts/ContextProvider";

export default function Nav() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const onLogOut = async () => {
    if (user) {
      await logout();
      localStorage.removeItem("Usuario");
      navigate("/");
      return;
    }

    await axios.post(
      "http://localhost:3001/logout",
      {},
      {
        withCredentials: true,
      }
    );
      await logout()
    localStorage.removeItem("Usuario");
    navigate("/");
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
            <li>
              <a href="app/categoria-producto/usados">Usados Garantizados</a>
            </li>
            <li>
              <a href="/categoria-producto/0km">0 KM</a>
            </li>
            <li>
              <a href="">Vende tu Auto</a>
            </li>
            <li>
              <a href="/create">Añadir Auto</a>
            </li>
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
          <ButtonCart />
        </nav>
        <Boxgold />
        <button onClick={onLogOut} className="bg-white p-1 rounded-lg ">
          Salir
        </button>
      </header>
    </main>
  );
}
