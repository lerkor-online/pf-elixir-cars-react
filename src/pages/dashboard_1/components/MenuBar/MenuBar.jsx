import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoo from '../imgs/logoo.png';
function MenuBar() {
  const location = useLocation();

  return (
    <div className="flex flex-col p-5 bg-neutral-700 min-w-full min-h-[98vh] rounded-lg shadow-lg">
      <div >
        <img src={logoo} alt=""className="w-32 h-auto mb-5"/>
      </div>

      <div className="flex flex-col">
        <button className="w-full m-auto my-2  hover:bg-yellow-500">
          <Link
            to="/dashboard_1/dashboard"
            className=" no-underline text-black hover:text-white"
          >
            Dashboard
          </Link>
        </button>
        <button className="w-full m-auto my-2 hover:bg-yellow-500">
          <Link
            to="/dashboard_1/users"
            className=" no-underline text-black hover:text-white"
          >
            Users
          </Link>
        </button>
        <button className="w-full m-auto my-2 hover:bg-yellow-500">
          <Link
            to="/dashboard_1/cars"
            className=" no-underline text-black hover:text-white"
          >
            Cars
          </Link>
        </button>
        <button className="w-full m-auto my-2 hover:bg-yellow-500">
          <Link
            to="/dashboard_1/settings"
            className=" no-underline text-black hover:text-white"
          >
            Settings
          </Link>
        </button>
      </div>
    </div>
  );
}

export default MenuBar;
