import React, { useState, useEffect } from "react";
import Slider from "react-slider";

const MIN_PRICE = 0;
const MAX_PRICE = 60000;
const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();
const MIN_KM = 0;
const MAX_KM = 200000;

export default function Filters({ brands, filters, onFilterChange }) {
  const [selectedBrand, setSelectedBrand] = useState(filters.brand || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    filters.priceRange || [MIN, MAX]
  );
  const [selectedYearRange, setSelectedYearRange] = useState(
    filters.yearRange || [MIN, MAX]
  );
  const [selectedKmRange, setSelectedKmRange] = useState(
    filters.kmRange || [MIN, MAX]
  );
  const [selectedEstado, setSelectedEstado] = useState(filters.estado || "");

  useEffect(() => {
    // Call the parent component's filter change handler with the updated filters
    onFilterChange({
      brand: selectedBrand,
      priceRange: selectedPriceRange,
      yearRange: selectedYearRange,
      kmRange: selectedKmRange,
      estado: selectedEstado,
    });
  }, [
    selectedBrand,
    selectedPriceRange,
    selectedYearRange,
    selectedKmRange,
    selectedEstado,
  ]);

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handlePriceRangeChange = (newValues) => {
    setSelectedPriceRange(newValues);
  };

  const handleYearRangeChange = (newValues) => {
    setSelectedYearRange(newValues);
  };

  const handleKmRangeChange = (newValues) => {
    setSelectedKmRange(newValues);
  };

  const handleEstadoChange = (e) => {
    setSelectedEstado(e.target.value);
  };

  const resetFilters = () => {
    setSelectedBrand("");
    setSelectedPriceRange([MIN_PRICE, MAX_PRICE]);
    setSelectedYearRange([MIN_YEAR, MAX_YEAR]);
    setSelectedKmRange([MIN_KM, MAX_KM]);
    setSelectedEstado("");
    onFilterChange({
      brand: "",
      priceRange: [MIN_PRICE, MAX_PRICE],
      yearRange: [MIN_YEAR, MAX_YEAR],
      kmRange: [MIN_KM, MAX_KM],
      estado: "",
    });
  };

  const applyFilters = () => {
    onFilterChange({
      brand: selectedBrand,
      priceRange: selectedPriceRange,
      yearRange: selectedYearRange,
      kmRange: selectedKmRange,
      estado: selectedEstado,
    });
  };

  return (
    <div>
      <div>
        <div className="mt-6 ml-2 text-lg font-bold">Marca</div>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">Todas</option>
          {brands.map((brand) => (
            <option key={brand.name} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>
      <section>
        <h3 className="mt-6 ml-2 text-lg font-bold">
          Precio <span>Range</span>
        </h3>
        <div className="values">
          ${selectedPriceRange[0]} - ${selectedPriceRange[1]}
        </div>
        <small>
          Current Range: ${selectedPriceRange[1] - selectedPriceRange[0]}
        </small>
        <Slider
          className="slider"
          onChange={handlePriceRangeChange}
          value={selectedPriceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
        />
      </section>
      <section>
        <div className="mt-6 ml-2 text-lg font-bold">
          Año <span>Range</span>
        </div>
        <div className="values">
          {selectedYearRange[0]} - {selectedYearRange[1]}
        </div>
        <Slider
          className="slider"
          onChange={handleYearRangeChange}
          value={selectedYearRange}
          min={MIN_YEAR}
          max={MAX_YEAR}
        />
        <small>
          Current Range: {selectedYearRange[1] - selectedYearRange[0]}
        </small>
      </section>
      <section>
        <h3 className="mt-6 ml-2 text-lg font-bold">
          Kilometraje <span>Range</span>
        </h3>
        <div className="values">
          {selectedKmRange[0]} - {selectedKmRange[1]}
        </div>
        <Slider
          className="slider"
          onChange={handleKmRangeChange}
          value={selectedKmRange}
          min={MIN_KM}
          max={MAX_KM}
        />
      </section>
      <div>
        <div className="mt-6 ml-2 text-lg font-bold">Estado</div>
        <select
          value={selectedEstado}
          onChange={(e) => setSelectedEstado(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={resetFilters}>Resetear Filtros</button>
        <button onClick={applyFilters}>Aplicar Filtros</button>
      </div>
    </div>
  );
}
