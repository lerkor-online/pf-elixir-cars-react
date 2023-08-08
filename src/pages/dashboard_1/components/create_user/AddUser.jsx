import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function AddUser() {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [isRoleFocused, setIsRoleFocused] = useState(false);
  const [isRoleValid, setIsRoleValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = () => {
    setIsNameFocused(false);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordFocused(false);
  };

  const handleRoleFocus = () => {
    setIsRoleFocused(true);
  };

  const handleRoleBlur = () => {
    setIsRoleFocused(false);
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    console.log(newName);

    setFormData((prevFormData) => ({
      ...prevFormData,
      name: newName,
    }));

    // Validamos el campo de nombre
    const nameRegex = /^[A-Za-z]+$/;
    if (
      newName.length >= 5 &&
      newName.length <= 30 &&
      nameRegex.test(newName)
    ) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    console.log(newEmail);

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));

    // Validamos el campo de email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (emailRegex.test(newEmail)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    console.log(newPassword);
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: newPassword,
    }));
    // Validamos el campo de password
    if (newPassword.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    console.log(newConfirmPassword);
    setConfirmPassword(newConfirmPassword);

    // Validamos el campo de confirmar password
    if (newConfirmPassword === formData.password) {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(false);
    }
  };

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    console.log(newRole);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role: newRole,
    }));

    // Validar el campo de role
    if (newRole !== "") {
      setIsRoleValid(true);
    } else {
      setIsRoleValid(false);
    }
  };

  useEffect(() => {
    setIsFormValid(
      isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isRoleValid
    );
  }, [
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isRoleValid,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);

    const jsonData = JSON.stringify(formData);
    console.log(jsonData);

    Swal.fire({
      title: "¿Deseas crear este usuario?",
      text: "Al presionar CREAR USUARIO se creará el usuario.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "CREAR USUARIO",
      cancelButtonText: "CANCELAR",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://localhost:3001/users",
            jsonData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          Swal.fire({
            title: "Creación exitosa",
            text: "El usuario se ha creado correctamente.",
            icon: "success",
          });

          console.log("Nuevo Usuario:", response.data);

          // "https://pf-elixir-cars-back-production.up.railway.app/user"
          // Limpio los campos después de confirmar

          setIsNameValid("");
          setIsEmailValid("");
          setIsPasswordValid("");
          setConfirmPassword("");
          setIsConfirmPasswordValid("");
          setIsRoleValid("");

          setFormData({
            name: "",
            email: "",
            password: "",
            role: "",
          });
        } catch (error) {
          Swal.fire({
            title: "Error al crear el usuario",
            text: "Se ah producido un error al enviar los datos del nuevo usuario.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  return (
    <div>
      <h1>Add User</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-2 mx-2 relative">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleNameChange}
              onFocus={handleNameFocus}
              onBlur={handleNameBlur}
              className={`border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none ${
                !isNameValid && !isNameFocused ? "border-red-500" : ""
              } ${isNameValid ? "border-green-500" : ""}`}
            />
            {!isNameValid && !isNameFocused && (
              <div className="text-red-500 text-sm mt-1">
                Por favor, ingresa un nombre válido (mínimo 5 caracteres y
                máximo 30 caracteres)
              </div>
            )}
          </div>

          <div className="flex flex-col mt-2 mx-2 relative">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleEmailChange}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              className={`border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none ${
                !isEmailValid && !isEmailFocused ? "border-red-500" : ""
              } ${isEmailValid ? "border-green-500" : ""}`}
            />
            {!isEmailValid && !isEmailFocused && (
              <div className="text-red-500 text-sm mt-1">
                Por favor, ingresa un email válido
              </div>
            )}
          </div>

          <div className="flex flex-col mt-2 mx-2 relative">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className={`border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none ${
                !isPasswordValid && !isPasswordFocused ? "border-red-500" : ""
              } ${isPasswordValid ? "border-green-500" : ""}`}
            />
            {!isPasswordValid && !isPasswordFocused && (
              <div className="text-red-500 text-sm mt-1">
                Por favor, ingresa una contraseña válida
              </div>
            )}
          </div>

          <div className="flex flex-col mt-2 mx-2 relative">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onFocus={handleConfirmPasswordFocus}
              onBlur={handleConfirmPasswordBlur}
              className={`border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none ${
                !isConfirmPasswordValid && !isConfirmPasswordFocused
                  ? "border-red-500"
                  : ""
              } ${isConfirmPasswordValid ? "border-green-500" : ""}`}
            />
            {!isConfirmPasswordValid && !isConfirmPasswordFocused && (
              <div className="text-red-500 text-sm mt-1">
                Las contraseñas no coinciden
              </div>
            )}
          </div>
          <div className="flex flex-col mt-2 mx-2 relative">
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleRoleChange}
              onFocus={handleRoleFocus}
              onBlur={handleRoleBlur}
              className={`border border-gray-300 rounded px-4 py-2 mt-1 mb-2 focus:outline-none ${
                !isRoleValid && !isRoleFocused ? "border-red-500" : ""
              } ${isRoleValid ? "border-green-500" : ""}`}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {!isRoleValid && !isRoleFocused && (
              <div className="text-red-500 text-sm mt-1">
                Por favor, selecciona un rol válido
              </div>
            )}{" "}
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
