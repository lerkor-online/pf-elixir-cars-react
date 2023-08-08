import React from "react";

function Card_Users({ user, handleCheckUser }) {
  return (
    <tr>
      <td className="p-3 text-sm font-mono tracking-wide text-left">
        {user.id}
      </td>
      <td className="p-3 text-sm font-mono tracking-wide text-left">
        {user.name}
      </td>
      <td className="p-3 text-sm font-semibold tracking-wide text-left">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          {user.email}
        </a>
      </td>
      <td className="p-3 text-sm font-mono tracking-wide text-left">
        {user.status}
      </td>
      <td className="p-3 text-sm font-mono tracking-wide text-left">
        {user.role}
      </td>
      <td className="p-3 text-sm tracking-wide text-center">
        <input type="checkbox" value={user.id} onChange={handleCheckUser} />
      </td>
    </tr>
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
