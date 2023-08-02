import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/ContextProvider";

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate();

  const { login, loginwithgoogle, user: usuario } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const onClose = (e) => {
    e.preventDefault();
    setShowLogin(false);
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const logHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const data = await response.data;

    if (data) {
      await login(data.email, data.password);
      localStorage.setItem("Usuario", data.token);
      navigate("/home");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////
  const handleGoogleSignin = async (e) => {
    e.preventDefault();
    await loginwithgoogle();
    try {
      const getUser = await axios.get(
        `http://localhost:3001/getUser?email=${usuario.email}`
      );
      const dataUser = await getUser.data;
      localStorage.setItem("Usuario", dataUser.token);
      navigate("/home");
    } catch (err) {
      await axios.post("http://localhost:3001/register", {
        name: usuario.displayName,
        email: usuario.email,
        password: usuario.uid,
      });
      localStorage.setItem("Usuario", usuario.token);
      navigate("/home");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed z-10">
        <div
          onClick={onClose}
          className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
        ></div>
        <div className="z-10  rounded-lg bg-[rgb(235,171,43)]  p-10   ">
          <form className="flex text-center">
            <section className="flex flex-col gap-5 p-3 ">
              <section className="flex max-lg:flex-col justify-between ">
                <label className="text-lg font-semibold" htmlFor="">
                  Email:{" "}
                </label>
                <input
                  name="email"
                  placeholder="elixir cars"
                  className="p-1 outline-none text-center rounded-lg"
                  type="text"
                  value={user.email}
                  onChange={inputChangeHandler}
                />
              </section>
              <section className="flex max-lg:flex-col justify-between gap-2 ">
                <label className="text-lg font-semibold" htmlFor="">
                  Contraseña:{" "}
                </label>
                <input
                  onChange={inputChangeHandler}
                  name="password"
                  value={user.password}
                  placeholder="********"
                  className="p-1 text-center outline-none rounded-lg"
                  type="text"
                />
              </section>
              <section className="">
                <section className="flex justify-center gap-2">
                  <button
                    onClick={logHandler}
                    className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Ingresar
                  </button>
                  {/* <button
                    onClick={onClose}
                    className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Cancelar
                  </button> */}
                </section>
                <h2>Continuar con:</h2>
                {/* <SignIn
                  afterSignInUrl="/home"
                  appearance={{
                    elements: {
                      header: "hidden",
                    },
                  }}
                /> */}
                <button
                  onClick={handleGoogleSignin}
                  className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                >
                  Google
                </button>
              </section>
            </section>
          </form>
          {err && <p>{err}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
