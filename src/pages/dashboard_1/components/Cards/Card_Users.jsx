import React from "react";

function Card_Users({ user, handleCheckUser, handlerUserEdit }) {
  return (
    <tr className="whitespace-nowrap border-b-2">
      <td className="p-3 text-sm font-mono tracking-wide text-left">
        <div>{user.id}</div>
      </td>

      <td className="p-3 text-sm font-mono tracking-wide text-left">
        <div>{user.name}</div>
      </td>

      <td className="p-3 text-sm font-semibold tracking-wide text-left">
        <div>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            {user.email}
          </a>
        </div>
      </td>

      <td className="p-3 text-sm font-mono tracking-wide text-left">
        <div>{user.role}</div>
      </td>

      <td className="px-4 py-4">
        <button
          className="w-fit h-fit p-0 border-0 text-white bg-white font-semibold rounded"
          onClick={() => handlerUserEdit(user.email)}
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
      </td>

      <td className="p-3 text-sm tracking-wide text-center">
        <div>
          <input type="checkbox" value={user.id} onChange={handleCheckUser} />
        </div>
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
