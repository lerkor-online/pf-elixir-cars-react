import React from "react";

function Card_Users({ user }) {
  console.log(user);
  return (
    <div className=" px-5 m-2 border-2 border-black items-center w-auto">
      <table className="grid grid-flow-col ">
        <tr>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>{user.name}</td>
        </tr>
        <tr>
          <td>{user.email}</td>
        </tr>
        <tr>
          <td>{user.status}</td>
        </tr>
        <tr>
          <td>{user.role}</td>
        </tr>
      </table>
    </div>
  );
}

export default Card_Users;

{
  /* <div className="m-2">{user.id}</div>
      <div className="m-2">{user.name}</div>
      <div className="m-2">{user.email}</div>
      <div className="m-2">{user.status}</div>
      <div className="m-2">{user.role}</div> */
}
