import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../contexts/ContextProvider";
import { useAuth } from "../../../contexts/ContextProvider";
export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, loginwithgoogle, user: usuario } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const turnBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const onRegister = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/register", user);
    const responseLogin = await axios.post("http://localhost:3001/login", user);
    const data = await responseLogin.data;
    await signup(data.email, data.password);
    localStorage.setItem("Usuario", data.token);
    navigate("/home");
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
    <section className="h-full bg-slate-500 grid place-content-center">
      <div className="z-10  rounded-lg bg-[rgb(235,171,43)]  p-10 m-6  ">
        <form className="flex text-center">
          <section className="flex flex-col gap-5 p-3 ">
            <h1 className="mb-3 text-2xl font-bold">Crea una cuenta</h1>
            <section className="flex max-lg:flex-col justify-between ">
              <label className="text-lg font-semibold" htmlFor="">
                Nombre:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.name}
                name="name"
                placeholder="elixir cars"
                className="p-1 outline-none text-center rounded-lg"
                type="text"
              />
            </section>
            <section className="flex max-lg:flex-col justify-between ">
              <label className="text-lg font-semibold" htmlFor="">
                Email:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.email}
                name="email"
                placeholder="example@gmail.com"
                className="p-1 text-center outline-none rounded-lg"
                type="text"
              />
            </section>
            <section className="flex max-lg:flex-col justify-between gap-2 ">
              <label className="text-lg font-semibold" htmlFor="">
                Contraseña:{" "}
              </label>
              <input
                onChange={onChangeHandler}
                value={user.password}
                name="password"
                placeholder="********"
                className="p-1 text-center outline-none rounded-lg"
                type="text"
              />
            </section>
            <section className="">
              <section className="flex justify-center gap-2">
                <button
                  onClick={onRegister}
                  className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                >
                  Registrarse
                </button>
                {/* <button
                  onClick={onClose}
                  className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button> */}
              </section>
              <h3>Continuar con:</h3>
              <button
                onClick={handleGoogleSignin}
                className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
              >
                Google
              </button>
            </section>
            <section>
              <button
                onClick={turnBack}
                className="bg-gray-200 mb-2 p-1 px-4 rounded-lg hover:bg-gray-300"
              >
                Volver
              </button>
            </section>
          </section>
        </form>
      </div>
    </section>
  );
}
