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
    <div className="flex flex-col min-h-full min-w-full ">
      <div className="flex felx-row min-h-[6vh] max-h-[6vh]">
        <div className="flex felx-row h-full">
          <div className="relative h-12 top-10">
            <button
              className={`px-4 h-10 p-0 rounded-b-sm text-start ${
                activeOption === "create-users"
                  ? " bg-slate-100"
                  : "bg-gray-400"
              }`}
              onClick={() => handleOptionChange("create-users")}
            >
              Crear Usuario
            </button>
          </div>
          <div className="relative h-16 top-10">
            <button
              className={`px-4 py-2 h-10 p-0 rounded-b-sm text-start ${
                activeOption === "admin-users" ? " bg-slate-100" : "bg-gray-400"
              }`}
              onClick={() => handleOptionChange("admin-users")}
            >
              Administrar Usuarios
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row z-10 mt-5  max-w-[100%]">
        <div className=" border-spacing-1 shadow-glass-card shadow-slate-500 text-black bg-white pt-2 min-w-[97%] min-h-[88vh] px-4 rounded-tr-md ">
          {renderOptionContent()}
        </div>
      </div>
    </div>
  );
}

export default Users;
