import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import MenuBar from "../MenuBar/MenuBar";
import Profile from "../Perfil/Profile";
function RootLayout({ children }) {
  return (
    <div className="flex flex-row w-full min-h-screen overflow-hidden">
      <div className="m-2 min-w-[15%]">
        <MenuBar />
      </div>

      <div className="flex flex-col min-w-[85%] min-h-full m-2">
        <div className="absolute flex flex-row items-center top-4 right-4">
          <Profile />
        </div>
        <div className="max-h-[97vh] overflow-auto">{children}</div>
      </div>
    </div>
  );
}

export default RootLayout;
