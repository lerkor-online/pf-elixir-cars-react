import React, { useState } from "react";

function Profile() {
  const [menuUser, setMenuUser] = useState(false);

  return (
    <div className="relative items-center">
      <div>
        <button
          className="p-0 rounded-full h-12 w-12"
          onClick={() => setMenuUser(!menuUser)}
        >
          <div className="h-full w-full rounded-full bg-black">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              alt=""
            />
          </div>
        </button>
      </div>
      {menuUser && (
        <div className="absolute -right-2 p-2 flex flex-col items-center bg-neutral-700 min-w-[150px] rounded-lg shadow-lg">
          <div className="h-16 w-16 bg-red-600 my-2 overflow-hidden rounded-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
              alt=""
              className="container w-16 h-16"
            />
          </div>
          <div>
            <button className="text-center m-auto my-1 p-0 py-0.5 px-2 w-full">
              Edit Profile
            </button>
            <button className="text-center m-auto my-1 p-0 py-0.5 px-2 w-full">
              Settings
            </button>
            <button className="text-center m-auto my-1 p-0 py-0.5 px-2 w-full">
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
