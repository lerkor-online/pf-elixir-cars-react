import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuBar() {
  const location = useLocation();

  return (
    <div className="flex flex-col p-5 bg-neutral-700 min-w-full min-h-[98vh] rounded-lg shadow-lg">
      <div className="">
        <img src="" alt="" />
        <h2 className="text-4xl text-white">ELIXIR CARS</h2>
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
