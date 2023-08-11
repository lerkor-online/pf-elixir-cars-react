import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../components/Card/Card";
import Paginate from "../../../components/Paginate/Paginate";
import Filters from "../../../components/Filters/Filters";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Sorts from "../../../components/Sorts/Sorts";
import "./Cerokm.css";

const URL = "https://pf-elixir-cars-back-production.up.railway.app/";
const limit = 12;
const MIN_PRICE = 0;
const MAX_PRICE = 60000;
const MIN_YEAR = 2010;
const MAX_YEAR = new Date().getFullYear();
const MIN_KM = 0;
const MAX_KM = 200000;

export default function Cerokm() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [selectedPriceRange, setSelectedPriceRange] = useState([
    MIN_PRICE,
    MAX_PRICE,
  ]);
  const [selectedYearRange, setSelectedYearRange] = useState([
    MIN_YEAR,
    MAX_YEAR,
  ]);
  const [selectedKmRange, setSelectedKmRange] = useState([MIN_KM, MAX_KM]);
  const [selectedEstado, setSelectedEstado] = useState("");

  const [selectedSorts, setSelectedSorts] = useState({
    brand: "",
    price: "",
  });

  const limitItems = isSearching ? 10000 : limit;

  const fetchData = async () => {
    try {
      const response = await axios(
        `${URL}cars?page=${currentPage}&limit=${limitItems}&minPrice=${selectedPriceRange[0]}&maxPrice=${selectedPriceRange[1]}&brand=${selectedBrand}&state=${selectedEstado}&minYear=${selectedYearRange[0]}&maxYear=${selectedYearRange[1]}&minKm=${selectedKmRange[0]}&maxKm=${selectedKmRange[1]}&sortByBrand=${selectedSorts.brand}&sortByPrice=${selectedSorts.price}`
      );

      const jsonData = await response.data;

      setTotalPages(jsonData.totalPages);

      if (Array.isArray(jsonData.data)) {
        setCars(jsonData.data);
      } else {
        console.log("API response is not an array:", jsonData.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios(`${URL}brands`);
      const jsonData = response.data;

      if (Array.isArray(jsonData)) {
        setBrands(jsonData);
      } else {
        console.log("API response is not an array:", jsonData);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetchData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      });

    fetchBrands();
    console.log(selectedSorts.brand);
    console.log(selectedSorts.price);
  }, [
    currentPage,
    isSearching,
    searchQuery,
    selectedBrand,
    selectedPriceRange,
    selectedYearRange,
    selectedKmRange,
    selectedEstado,
    selectedSorts,
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters) => {
    setSelectedBrand(newFilters.brand);
    setSelectedPriceRange(newFilters.priceRange);
    setSelectedYearRange(newFilters.yearRange);
    setSelectedKmRange(newFilters.kmRange);
    setSelectedEstado(newFilters.estado);
    setCurrentPage(1);
  };

  // Función para manejar los cambios de ordenamiento
  const handleSortChange = (column, direction) => {
    setSelectedSorts((prevSorts) => ({
      ...prevSorts,
      [column]: direction,
    }));
  };

  // Función para resetear los ordenamientos
  const handleResetSort = () => {
    setSelectedSorts({
      brand: "",
      price: "",
    });
  };

  const handleSearchBarReset = () => {
    setIsSearching(false);
    setSearchQuery("");
    setCurrentPage(1);
    fetchData();
  };

  const filteredCars = cars.filter(
    (car) =>
      car.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.carModel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.presentacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.estado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year.toString().includes(searchQuery)
  );

  return (
    <div>
      <header className="h-20"></header>
      <section className="mt-4 h-16 w-11/12 flex justify-end uppercase">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          setCurrentPage={setCurrentPage}
          fetchData={fetchData}
          handleSearchBarReset={handleSearchBarReset}
        />
      </section>
      <section className="flex">
        <div className="w-2/12 p-6">
          <h3 className="text-xl font-bold p-2 bg-black rounded-md text-white text-center">
            Filtro
          </h3>
          <Filters
            brands={brands}
            filters={{
              brand: selectedBrand,
              priceRange: selectedPriceRange,
              yearRange: selectedYearRange,
              kmRange: selectedKmRange,
              estado: selectedEstado,
            }}
            onFilterChange={handleFilterChange}
          />
          <Sorts
            handleSortChange={handleSortChange}
            handleResetSort={handleResetSort}
            selectedSorts={selectedSorts}
          />
        </div>
        <div className=" mb-24 m-6 grid grid-cols-4 grid-rows-10 gap-2 h-auto w-9/12 mx-auto text-black items-center">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            filteredCars.map((auto) => <Card key={auto.id} auto={auto} />)
          )}
        </div>
      </section>
      <div className="flex justify-center items-center w-full h-20 bg-neutral-900 ">
        <div className="flex items-center space-x-2 w-full bg-neutral-900">
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
