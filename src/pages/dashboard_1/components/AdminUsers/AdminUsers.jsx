import React, { useState, useEffect } from "react";
import axios from "axios";
import Card_Users from "../Cards/Card_Users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsersByEmail = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");

        const jsonData = await response;
        console.log(jsonData);
        if (Array.isArray(jsonData)) {
          setUsers(jsonData);
        } else {
          console.log("Response is not an array");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUsersByEmail();
  }, []);

  const handleCheckUser = (e) => {
    const userId = e.target.value;
    console.log(userId);
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="w-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b-2 border-gray-200">
            <tr className="">
              <th className=" w-10 p-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                NAME
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                EMAIL
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                STATUS
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                ROL
              </th>
              <th className="w-5 p-3 text-sm font-semibold tracking-wide text-left">
                Select
              </th>
            </tr>
          </thead>

          <tbody>
            {users &&
              users.map((user, index) => (
                <Card_Users
                  key={index}
                  user={user.id}
                  handleCheckUser={handleCheckUser}
                />
              ))}
          </tbody>
        </table>
        {/* <div className="m-2">ID</div>
        <div className="m-2">NAME</div>
        <div className="m-2">EMAIL</div>
        <div className="m-2">STATUS</div>
        <div className="m-2">ROL</div> */}
      </div>
    </div>
  );
}

export default AdminUsers;
