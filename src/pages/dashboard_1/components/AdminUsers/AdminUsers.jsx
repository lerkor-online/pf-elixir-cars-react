import React, { useState, useEffect } from "react";
import axios from "axios";
import Card_Users from "../Cards/Card_Users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");

      const jsonData = await response.data.users;
      console.log([jsonData]);

      if (Array.isArray([jsonData]) && jsonData.length > 0) {
        setUsers(jsonData);
      } else {
        console.log("No hay usuarios");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (users.length === 0) {
    fetchUser();
  }

  const handlerUserEdit = async (email) => {
    console.log(email);
    try {
      const response = await axios.get(
        `http://localhost:3001/user?email=${email}`
      );
      console.log(response);
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

    try {
      const response = await axios.delete(
        `http://localhost:3001/users/${selectedUsers}`,
        {
          data: { ids: selectedUsers },
        }
      );
      console.log(response);

      console.log("El usuario se ha borrado correctamente.");
    } catch (error) {
      console.log("Error al borrar el usuario", error);
    } finally {
      console.log("Usuario(s) Borrado(s)", selectedUsers);
      fetchUser();
      setSelectedUsers([]);
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="flex flex-row">
        <div className="p-4 flex">
          <h1 className="text-3xl">Users</h1>
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
      <div className="flex flex-col">
        <div className="w-full ">
          <div className="m-5 border-b border-gray-200 rounded-sm shadow">
            <table className="min-w-full divide-y-2 divide-[#f1d72f]">
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
              {users.length === 0 ? (
                <div className="min-w-full bg-white divide-y divide-gray-300">
                  Loading...
                </div>
              ) : (
                <tbody className="bg-white divide-y divide-gray-300">
                  {users?.map((user, index) => (
                    <Card_Users
                      key={index}
                      user={user}
                      handlerUserEdit={handlerUserEdit}
                      handleCheckUser={handleCheckUser}
                    />
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
