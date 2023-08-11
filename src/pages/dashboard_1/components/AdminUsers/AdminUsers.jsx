import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Card_Users from "../Cards/Card_Users";
import DetailUser from "../DetailUser/DetailUser";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [serching, setSerching] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");

      const jsonData = await response.data;
      console.log(jsonData.users);

      if (Array.isArray(jsonData.users) && jsonData.users.length > 0) {
        setUsers(jsonData.users); // No es necesario envolver jsonData.users en un array adicional
      } else {
        console.log("No hay usuarios");
        setUsers(jsonData);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (users.length === 0 && !serching) {
    fetchUser();
    setSerching(true);
  }

  const handlerUserEdit = async (email) => {
    console.log(email);
    try {
      const response = await axios.get(
        `http://localhost:3001/user?email=${email}`
      );
      setUser(response.data);
      console.log(user);
    } catch (error) {
      console.log("Error al editar el usuario", error);
    }
  };

  const handleCheckUser = (e) => {
    const userId = e.target.value;
    console.log(userId);
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setShowDeleteButton(true);
    } else {
      setShowDeleteButton(false);
    }
  }, [selectedUsers]);

  const handleDeleteUsers = async () => {
    console.log(selectedUsers);

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, borrar!",
      cancelButtonText: "Cancelar",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.delete(
              `http://localhost:3001/users/${selectedUsers}`,
              {
                data: { ids: selectedUsers },
              }
            );

            Swal.fire({
              title: "Borrado exitoso",
              text: "El usuario ha sido borrado correctamente.",
              icon: "success",
            });
            console.log(response);
            console.log("El usuario se ha borrado correctamente.");
          } catch (error) {
            console.log("Error al borrar el usuario", error);
          } finally {
            console.log("Usuario(s) Borrado(s)", selectedUsers);
            fetchUser();
            setSelectedUsers([]);
            setUser({});
          }
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error al eliminar el usuario",
          text: "Se ah producido un error al enviar los datos del nuevo usuario.",
          icon: "error",
        });
        console.error(error);
      });
  };
  const resetUser = () => {
    fetchUser();
  };

  return (
    <div className="flex flex-row h-full w-[100%]">
      <div className="text-gray-900 bg-slate-100 rounded-lg mt-2 mr-2 w-[75%]">
        <div className="flex flex-row">
          <div className="p-4 flex">
            <h1 className="text-4xl">Users</h1>
          </div>
          {showDeleteButton && (
            <div className="ml-auto mr-4 mt-auto ">
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleDeleteUsers}
              >
                Delete User(s)
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full overflow-hidden">
          <div className="w-full flex flex-row">
            <div className="w-full m-5 border-b border-gray-200 rounded-sm shadow">
              <table className="min-w-full border-b-2 divide-y-2 divide-[#f1d72f] border-[#f1d72f]">
                <thead className="bg-gray-50 ">
                  <tr className="">
                    <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">
                      ID
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      NAME
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      EMAIL
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      ROLE
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      EDIT
                    </th>
                    <th className="w-5 p-3 text-sm font-semibold tracking-wide text-left">
                      SELECT
                    </th>
                  </tr>
                </thead>

                {Array.isArray(users) && users.length > 0 ? (
                  <tbody className="bg-white divide-y divide-gray-300">
                    {users.map((user, index) => (
                      <Card_Users
                        key={index}
                        user={user}
                        handlerUserEdit={handlerUserEdit}
                        handleCheckUser={handleCheckUser}
                      />
                    ))}
                  </tbody>
                ) : (
                  // Maneja el caso en el que users no sea un array o no tenga elementos
                  <div className="justify-center items-center w-150 absolute">
                    <tbody></tbody>
                    <div className=" justify-center items-center w-full">
                      <p className="text-red-500 w-full">
                        No hay usuarios disponibles
                      </p>
                    </div>
                  </div>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="border-2 text-black bg-slate-100 rounded-lg mt-2 ml-2 w-[25%] overflow-hidden ">
        <DetailUser user={user} resetUser={resetUser} />
      </div>
    </div>
  );
}

export default AdminUsers;
