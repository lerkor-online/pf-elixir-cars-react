import React, { useState } from "react";
import axios from "axios";
import Card_Users from "../Cards/Card_Users";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  console.log(users);

  const fetchUsersByEmail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/users?email=hengersrosario@gmail.com"
      );

      const jsonData = await response.data;
      console.log(jsonData);
      setUsers(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  if (users.length === 0 && users) {
    fetchUsersByEmail();
  }

  return (
    <div>
      <div className="flex flex-row m-2 mb-0 border-2 border-black items-center justify-between">
        <table>
          <tr>
            <td>ID</td>
          </tr>
          <tr>
            <td>NAME</td>
          </tr>
          <tr>
            <td>EMAIL</td>
          </tr>
          <tr>
            <td>STATUS</td>
          </tr>
          <tr>
            <td>ROL</td>
          </tr>
        </table>
        {/* <div className="m-2">ID</div>
        <div className="m-2">NAME</div>
        <div className="m-2">EMAIL</div>
        <div className="m-2">STATUS</div>
        <div className="m-2">ROL</div> */}
      </div>

      <div className="flex flex-col mx-auto">
        {users && <Card_Users user={users} />}
      </div>
    </div>
  );
}

export default AdminUsers;
