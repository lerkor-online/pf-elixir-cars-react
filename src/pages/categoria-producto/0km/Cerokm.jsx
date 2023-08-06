/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"; // Asegúrate de importar React si aún no lo has hecho
import axios from "axios";
import Card from "../../../components/Card/Card";
import Paginate from "../../../components/Paginate/Paginate";
import Filters from "../../../components/Filters/Filters";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Slider from "react-slider";
import "./Cerokm.css";

const URL = "https://pf-elixir-cars-back-production.up.railway.app/";
const limit = 12;
const MIN = 0;
const MAX = 60000;

export default function Cerokm() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showFilters, setShowFilters] = useState(true);
  const [filterButtonSymbol, setFilterButtonSymbol] = useState("◀");

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [values, setValues] = useState([MIN, MAX]);

  const limitItems = isSearching ? 10000 : limit;

  const fetchData = async (currentPage) => {
    try {
      const response = await axios(
        `${URL}cars?page=${currentPage}&limit=${limitItems}&minPrice=${values[0]}&maxPrice=${values[1]}&brand=${brand}&estado=new `
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

    fetchData(currentPage)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
        setIsLoading(false);
      });

    fetchBrands();
  }, [currentPage, isSearching, searchQuery, values[0], values[1], brand]);

  console.log(brand);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function handleFilterBrand(e) {
    console.log(e.target.value);
    setBrand(e.target.value);
  }

  /* const handleToggleFilters = () => {
    setShowFilters((prevShowFilters) => {
      setFilterButtonSymbol(prevShowFilters ? "▶" : "◀");
      return !prevShowFilters;
    });
  }; */

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
            isSearching={isSearching} // Paso  isSearching como prop
            setIsSearching={setIsSearching} // Paso setIsSearching como prop
            setCurrentPage={setCurrentPage} // Pasa setCurrentPage como prop
            fetchData={fetchData} // Aqui paso la función fetchData como prop
            handleSearchBarReset={handleSearchBarReset} // Paso la función handleSearchBarReset como prop
          />
      </section>
      <section className="flex">
        <div className="w-2/12 p-6">
          <h3 className="text-xl font-bold p-2 bg-black rounded-md text-white text-center">
            Filtro
          </h3>
          {/* <li>
            <div>
              <input type="checkbox" />
              <label>
                <a href="">En Stock Oportunidad</a>
              </label>
            </div>
          </li> */}
          <div>
            {/* <div className="mt-6 ml-2 text-lg font-bold">Destacado</div>
            <div className="text-s">Aqui van los destacados a filtrar</div> */}
            <div className="mt-6 ml-2 text-lg font-bold">Marca</div>
            <select onChange={handleFilterBrand}>
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
            <div className={"values"}>
              ${values[0]} - ${values[1]}
            </div>
            <small>Current Range: ${values[1] - values[0]}</small>
            <Slider
              className="slider"
              onChange={setValues}
              value={values}
              min={MIN}
              max={MAX}
            />
          </section>
        </div>
        <div className=" mb-24 m-6 grid grid-cols-4 grid-rows-10 gap-2 h-auto w-9/12 mx-auto text-black items-center">
          {isLoading ? (
            // Show the loading message or spinner while isLoading is true
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
