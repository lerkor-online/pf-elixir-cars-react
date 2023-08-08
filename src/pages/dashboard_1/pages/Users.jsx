import React from "react";
import AddUser from "../components/create_user/AddUser";

function Users() {
  return (
    <div className="flex flex-col m-auto min-h-full min-w-full ">
      <div className="flex felx-row min-h-[6vh]">
        <h1>USERS</h1>
        <button>Crear Usuario</button>
        <button>Administrar Usuarios</button>
      </div>
      <div className="flex flex-row">
        <div className="border-2 text-black bg-slate-300 rounded-lg mt-2 min-w-[70vw] min-h-[91vh]">
          <AddUser />
        </div>
        <div className="border-2 text-black bg-slate-300 rounded-lg mt-2 mx-auto w-auto min-h-[91vh]">
          Hola
        </div>
      </div>
    </div>
  );
}

export default Users;
