import React from "react";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setIsSearching,
  setCurrentPage, // Actualizo la página a 1 cuando se realiza una búsqueda
  fetchData, // Agrego fetchData como prop
  handleSearchBarReset, // Agrega handleSearchBarReset como prop
}) {
  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchQuery(value);
    setIsSearching(true); // Actualizo la variable isSearching a true
    setCurrentPage(1); // Actualiza la página a 1 cuando se realiza una búsqueda
    fetchData(); // Llamo a la función fetchData cuando se inicia la búsqueda

    if (value === "") {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex items-center mb-4 overflow-hidden">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-s-md p-2 "
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSearchBarReset}
        className="rounded-none h-10 w-16 p-0 text-center rounded-e-md border-gray-500"
      >
        Reset
      </button>
    </div>
  );
}
