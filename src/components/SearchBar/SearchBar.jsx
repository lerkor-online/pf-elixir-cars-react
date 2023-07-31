import React from "react";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  setIsSearching,
  setCurrentPage, // Actualizo la página a 1 cuando se realiza una búsqueda
  fetchData, // Agrego fetchData como prop
}) {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setIsSearching(true); // Actualizo la variable isSearching a true
    setCurrentPage(1); // Actualiza la página a 1 cuando se realiza una búsqueda
    fetchData(); // Llamo a la función fetchData cuando se inicia la búsqueda
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md p-2"
        placeholder="Buscar..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
}
