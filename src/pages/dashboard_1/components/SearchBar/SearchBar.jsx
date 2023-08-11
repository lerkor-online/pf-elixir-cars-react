import React from "react";

function SearchBar() {
  return (
    <div className="relative max-w-fit m-4 items-center">
      <div className="flex flex-row items-center">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-s-md p-2 "
          placeholder="Buscar..."
        />
        <button className="rounded-none h-10 w-16 p-0 px-2 text-center rounded-e-md border-gray-500">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
