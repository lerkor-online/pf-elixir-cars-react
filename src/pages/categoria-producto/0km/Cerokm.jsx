/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"; // Asegúrate de importar React si aún no lo has hecho
import axios from "axios";
import Card from "../../../components/Card/Card";
import Paginate from "../../../components/Paginate/Paginate";
import Filters from "../../../components/Filters/Filters";
import SearchBar from "../../../components/SearchBar/SearchBar";

export default function Cerokm() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showFilters, setShowFilters] = useState(true);
  const [filterButtonSymbol, setFilterButtonSymbol] = useState("◀");

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const limit = isSearching ? 10000 : 12;
  console.log(limit);
  const fetchData = async (currentPage) => {
    try {
      const response = await axios(
        `https://pf-elixir-cars-back-production.up.railway.app/cars?page=${currentPage}&limit=${limit}`
      );
      const jsonData = await response.data;
      console.log(jsonData);

      setTotalPages(jsonData.totalPages);
      console.log(jsonData.totalPages);

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

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleFilters = () => {
    setShowFilters((prevShowFilters) => {
      setFilterButtonSymbol(prevShowFilters ? "▶" : "◀");
      return !prevShowFilters;
    });
  };

  const handleSearchBarReset = () => {
    setIsSearching(false);
    setSearchQuery("");
    fetchData();
  };
  console.log(cars);

  const filteredCars = cars.filter(
    (car) =>
      car.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.carModel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.presentacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.estado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year.toString().includes(searchQuery)
  );

  if (isLoading) {
    return <div className="mt-20">Loading...</div>;
  }

  return (
    <div>
      <header className="h-20"></header>
      <section className="m-4 w-11/12 flex justify-end uppercase">
        <select>
          <option>Orden Predeterminado</option>
        </select>
      </section>
      <section className="flex">
        <div className="w-2/12 p-6">
          <h3 className="text-xl font-bold p-2 bg-black rounded-md text-white text-center">
            Filtro
          </h3>
          <li>
            <div>
              <input type="checkbox" />
              <label>
                <a href="">En Stock Oportunidad</a>
              </label>
            </div>
          </li>
          <div>
            <div className="mt-6 ml-2 text-lg font-bold">Destacado</div>
            <div className="text-s">Aqui van los destacados a filtrar</div>
            <div className="mt-6 ml-2 text-lg font-bold">Marca</div>
            <div>Aqui van las marcas a filtrar</div>
          </div>
          <div className="mt-6 ml-2 text-lg font-bold">Precio</div>
          <div>Aqui van las precios a filtrar</div>
        </div>
        <div>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearching={isSearching} // Paso  isSearching como prop
            setIsSearching={setIsSearching} // Paso setIsSearching como prop
            setCurrentPage={setCurrentPage} // Pasa setCurrentPage como prop
            fetchData={fetchData} // Aqui paso la función fetchData como prop
          />
          <button onClick={handleSearchBarReset}>Reset</button>
        </div>
        <div className=" mb-24 m-6 grid grid-cols-4 grid-rows-10 gap-2 h-auto w-9/12 mx-auto text-black items-center">
          {filteredCars.map((auto) => (
            <Card key={auto.id} auto={auto} />
          ))}
        </div>
      </section>
      <section>
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}
