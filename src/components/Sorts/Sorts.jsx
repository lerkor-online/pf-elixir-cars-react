import React from "react";

const Sorts = ({ handleSortChange, handleResetSort, selectedSorts }) => {
  const handleBrandSortChange = (value) => {
    handleSortChange("brand", value);
    console.log(value);
  };

  const handlePriceSortChange = (value) => {
    handleSortChange("price", value);
    console.log(value);
  };

  const handleReset = () => {
    handleResetSort();
    handleBrandSortChange("");
    handlePriceSortChange("");
  };

  return (
    <div className="sorts-container">
      <h3 className="text-lg font-bold mb-2">Ordenar por:</h3>
      <div className="sorts-options">
        <label>
          <select
            value={selectedSorts.brand}
            onChange={(e) => handleBrandSortChange(e.target.value)}
          >
            <option value="">Marca</option>
            <option value="asc">Marca A-Z</option>
            <option value="desc">Marca Z-A</option>
          </select>
        </label>
        <label>
          <select
            value={selectedSorts.price}
            onChange={(e) => handlePriceSortChange(e.target.value)}
          >
            <option value="">Precio</option>
            <option value="asc">Precio Menor</option>
            <option value="desc">Precio Mayor</option>
          </select>
        </label>
      </div>
      <button onClick={handleReset} className="reset-button">
        Resetear Ordenamiento
      </button>
    </div>
  );
};

export default Sorts;
