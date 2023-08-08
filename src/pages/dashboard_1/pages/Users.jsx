import React, { useState } from "react";
import AddUser from "../../create_user/AddUser";
import AdminUsers from "../components/AdminUsers/AdminUsers";

function Users() {
  const [activeOption, setActiveOption] = useState("create-users");

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };
  const renderOptionContent = () => {
    switch (activeOption) {
      case "create-users":
        return <AddUser />;
      case "admin-users":
        return <AdminUsers />;
      default:
        return <AddUser />;
    }
  };

  return (
    <div className="flex flex-col m-auto min-h-full min-w-full ">
      <div className="flex felx-row min-h-[6vh]">
        <button
          className={`px-4 py-2 ${
            activeOption === "create-users" ? "bg-gray-400" : "bg-gray-200"
          }`}
          onClick={() => handleOptionChange("create-users")}
        >
          Crear Usuario
        </button>
        <button
          className={`px-4 py-2 ${
            activeOption === "admin-users" ? "bg-gray-400" : "bg-gray-200"
          }`}
          onClick={() => handleOptionChange("admin-users")}
        >
          Administrar Usuarios
        </button>
      </div>
      <div className="flex flex-row">
        <div className="border-2 text-black bg-slate-300 rounded-lg mt-2 min-w-[70vw] min-h-[91vh]">
          {renderOptionContent()}
        </div>
        <div className="border-2 text-black bg-slate-300 rounded-lg mt-2 mx-auto w-auto min-h-[91vh]">
          Hola
        </div>
      </div>
    </div>
  );
}

export default Users;
