import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function DetailUser({ user, resetUser }) {
  const [userMod, setUserMod] = useState({});
  console.log(userMod);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState("");
  const [originalName, setOriginalName] = useState(""); // Nuevo estado para almacenar el nombre original

  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  const [newRole, setNewRole] = useState("");
  const [originalRole, setOriginalRole] = useState("");
  //   const [newStatus, setNewStatus] = useState("");

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);

  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setUserMod(user);
  }, [user]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
    if (e.target.value.length < 5) {
      setNameError("El nombre debe tener al menos 5 caracteres");
    } else {
      setNameError("");
    }
  };

  const handleNameSave = () => {
    if (nameError) {
      return;
    } else if (newName !== userMod?.name) {
      setUserMod({ ...userMod, name: newName });
    }
    setEditingName(false);
    setIsButtonActive(true);
  };

  const handleNameCancel = () => {
    setEditingName(false);
    setNewName(originalName);
  };
  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(e.target.value)) {
      setEmailError("El email no es válido");
    } else {
      setEmailError("");
    }
  };

  const handleEmailSave = () => {
    if (emailError) {
      return;
    } else if (newEmail !== userMod?.email) {
      setUserMod({ ...userMod, email: newEmail });
    }
    setEditingEmail(false);
    setIsButtonActive(true);
  };

  const handleEmailCancel = () => {
    setEditingEmail(false);
    setNewEmail(originalEmail);
  };
  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordSave = () => {
    if (passwordError) {
      return;
    } else if (newPassword !== userMod?.password) {
      setUserMod({ ...userMod, password: newPassword });
    }
    setEditingPassword(false);
    setIsButtonActive(true);
  };

  const handlePasswordCancel = () => {
    setEditingPassword(false);
  };

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const handleRoleSave = () => {
    if (newRole !== userMod?.role) {
      setUserMod({ ...userMod, role: newRole });
    }
    setEditingRole(false);
    setIsButtonActive(true);
  };

  const handleRoleCancel = () => {
    setEditingRole(false);
    setNewRole(originalRole);
  };

  const handleStatusSave = async () => {
    const newStatusValue = userMod?.status === "active" ? "inactive" : "active";
    Swal.fire({
      title: "¿Estás seguro?",
      text: `El usario ${userMod?.name} pasara a estar ${newStatusValue}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, estoy seguro!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            /* `http://localhost:3001/users/${userMod?.id}/suspend`, */
            `https://pf-elixir-cars-back-production.up.railway.app/users/${userMod?.id}/suspend`,
            {
              status: newStatusValue,
            }
          );

          Swal.fire({
            title: "Actualización exitosa",
            text: "El usuario se ha actualizado correctamente.",
            icon: "success",
          });
          console.log(response.data);
          setUserMod({ ...userMod, status: response.data.status });

          // Actualizar el estado local después de la respuesta exitosa
        } catch (error) {
          console.error("Error al actualizar el estado del usuario:", error);
        } finally {
          setEditingStatus(false);
        }
      }
    });
  };

  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      id: userMod.id,
      name: newName !== "" ? newName : userMod.name,
      email: newEmail !== "" ? newEmail : userMod.email,
      password: newPassword !== "" ? newPassword : userMod.password,
      role: newRole !== "" ? newRole : userMod.role,
    };

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, borrar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put(
            /* `http://localhost:3001/users/${userMod?.id}`, */
            `https://pf-elixir-cars-back-production.up.railway.app/users/${userMod?.id}`,
            updatedUser
          );
          const { id, name, email, password, role } = response.data;
          setUserMod({ id, name, email, password, role });
          console.log(response.data);
          Swal.fire({
            title: "Actualización exitosa",
            text: "El usuario se ha actualizado correctamente.",
            icon: "success",
          });
          setUserMod(response.data);
        } catch (error) {
          console.error("Error al actualizar el usuario:", error);
        } finally {
          resetUser();
          setIsButtonActive(false);
        }
      }
    });
  };

  //   console.log(userMod?.name);
  //   console.log(userMod?.email);
  //   console.log(userMod?.role);
  //   console.log(userMod?.status);

  if (!user || Object.keys(user).length === 0) {
    return (
      <div
        className="my-2 flex flex-col justify-center items-center mt-10"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="flex-none w-40 h-[175px] bg-gray-300 rounded-sm animate-pulse mb-4"></div>
        <div>
          <div className="flex-none w-40 h-[20px] bg-gray-300 rounded-sm animate-pulse my-2"></div>
          <div className="flex-none w-40 h-[20px] bg-gray-300 rounded-sm animate-pulse my-2"></div>
          <div className="flex-none w-40 h-[20px] bg-gray-300 rounded-sm animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="flex w-full justify-end mt-2 mr-4 rounded-lg">
        <button
          onClick={handleStatusSave}
          className={`px-2 py-1 rounded-lg w-20 ${
            userMod?.status === "active"
              ? "bg-green-700 text-white font-bold"
              : "bg-orange-700 text-white"
          }`}
        >
          {userMod?.status === "active" ? "Active" : "Inactive"}
        </button>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold m-auto">User Profile</h1>
      </div>
      <form
        onSubmit={handleChangeSubmit}
        className="flex flex-col items-center w-full px-4 pt-2 "
      >
        <div className="flex bg-slate-500 rounded-full  justify-center items-center w-32 h-32">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
            alt=""
          />
        </div>

        <div className="w-full max-h-[500px] overflow-hidden p-2 overflow-y-auto">
          <div className="bg-gray-100 rounded-lg py-2 px-4 min-w-full mt-4">
            {editingName ? (
              <div className="grid grid-cols-1 gap-4 items-center">
                <h2 className="text-lg">Name</h2>
                <div>
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                    className="w-full rounded-lg border-2 border-b-blue-500 focus:outline-none px-2 py-1 mb-2 col-span-2"
                  />
                  {nameError && (
                    <span className="text-red-500">{nameError}</span>
                  )}
                  <div className="flex flex-row w-full m-auto items-center justify-center">
                    <button
                      type="button"
                      disabled={nameError || newName === ""}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                      onClick={handleNameSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                      onClick={handleNameCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between flex-col">
                <h2 className="text-lg">Name</h2>
                <div className="flex flex-row w-full m-auto items-center justify-between">
                  <div>{userMod?.name}</div>
                  <button
                    type="button"
                    className="w-fit h-fit m-2 p-0 border-0 text-white  bg-gray-100 font-semibold rounded"
                    onClick={() => {
                      setEditingName(true);
                      setOriginalName(newName);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                      2 0 112.828 
                      2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg py-2 px-4 min-w-full mt-4">
            {editingEmail ? (
              <div className="grid grid-cols-1 gap-4 items-center">
                <h2 className="text-xl">Email</h2>
                <div>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={handleEmailChange}
                    className="w-full rounded-lg border-2 border-b-blue-500 focus:outline-none px-2 py-1 mb-2 col-span-2"
                  />
                  {emailError && (
                    <span className="text-red-500">{emailError}</span>
                  )}

                  <div className="flex flex-row w-full m-auto items-center justify-center">
                    <button
                      type="button"
                      disabled={emailError || newEmail === ""}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                      onClick={handleEmailSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                      onClick={handleEmailCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between flex-col">
                <h2 className="text-lg">Email</h2>
                <div className="flex flex-row w-full m-auto items-center justify-between">
                  <div className="flex flex-row w-full m-auto items-center justify-between">
                    {userMod?.email}
                  </div>
                  <button
                    type="button"
                    className="w-fit h-fit m-2 p-0 border-0 text-white  bg-gray-100 font-semibold rounded"
                    onClick={() => {
                      setEditingEmail(true);
                      setOriginalEmail(newEmail);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                      2 0 112.828 
                      2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg py-2 px-4 min-w-full mt-4">
            {editingPassword ? (
              <div className="grid grid-cols-1 gap-4 items-center">
                <h2 className="text-lg">Password</h2>
                <div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border-2 border-b-blue-500 focus:outline-none px-2 py-1 mb-2 col-span-2"
                  />
                  {passwordError && (
                    <span className="text-red-500">{passwordError}</span>
                  )}
                  <div className="flex flex-row w-full m-auto items-center justify-center">
                    <button
                      type="button"
                      disabled={passwordError || newPassword === ""}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                      onClick={handlePasswordSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                      onClick={handlePasswordCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-w-full items-center justify-center flex-col">
                <h2 className="text-lg">Password</h2>
                <div className="flex flex-row w-full items-center justify-between">
                  <h2 className="">¿Deseas cambiar la contraseña?</h2>
                  <button
                    className="w-fit h-fit m-2 p-0 border-0 text-white  bg-gray-100 font-semibold rounded"
                    onClick={() => setEditingPassword(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                    2 0 112.828 
                    2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg py-2 px-4 min-w-full mt-4 ">
            {editingRole ? (
              <div className="flex flex-col min-w-full">
                <h2 className="text-lg col-span-2">Role</h2>
                <div className="flex flex-row w-full m-auto items-center justify-between">
                  <select
                    value={newRole}
                    onChange={handleRoleChange}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  >
                    <option value="admin">admin</option>
                    <option value="user">user</option>
                  </select>
                  <div className="flex flex-row">
                    <button
                      type="button"
                      onClick={handleRoleSave}
                      className="text-blue-600 hover:text-white hover:bg-blue-700 hover:border-blue-700 mr-2 p-1"
                    >
                      Save Role
                    </button>
                    <button
                      type="button"
                      onClick={handleRoleCancel}
                      className="text-red-600 hover:text-white hover:bg-red-600 hover:border-red-600 p-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full m-auto">
                <h2 className="text-lg col-span-2">Role</h2>

                <div className="flex flex-row w-full m-auto items-center justify-between">
                  {userMod?.role === "admin" ? "Admin" : "User"}
                  <button
                    type="button"
                    onClick={() => setEditingRole(true)}
                    className="w-fit h-fit m-2 p-0 border-0 text-white  bg-gray-100 font-semibold rounded"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                      2 0 112.828 
                      2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isButtonActive}
          className={`mt-6 py-2 px-4 rounded ${
            isButtonActive
              ? "bg-blue-500 text-white animate-pulse-gradient px-4 mb-8 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700] "
              : "bg-gray-400 text-white  px-4 mb-8 rounded-lg transition duration-300 shadow-[#555555] cursor-not-allowed"
          }`}
        >
          Save Change
        </button>
      </form>
    </div>
  );
}

export default DetailUser;
