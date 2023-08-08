import React, { useState, useEffect } from "react"; // Asegúrate de importar React si aún no lo has hecho
import axios from "axios";
import "./deleteCar.css";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";

const URL = "https://pf-elixir-cars-back-production.up.railway.app/";
const limit = 12;
const MIN = 0;
const MAX = 60000;
function DeleteCar() {
  const [cars, setCars] = useState([]);

  const [brand, setBrand] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
        setBrand(jsonData);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.carModel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.presentacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.estado.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.year.toString().includes(searchQuery)
  );

  const handleDeleteCar = async (carId) => {
    try {
      // Realizar la solicitud DELETE al backend para eliminar el automóvil
      await axios.delete(`${URL}cars/${carId}`);

      // Después de eliminar, actualizar la lista de autos sin el automóvil eliminado
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error al eliminar el automóvil:", error);
      // Manejar errores si ocurre algún problema al eliminar el automóvil
    }
  };

  return (
    <div>
      <section className="flex">
        <div className=" grid grid-cols-4 grid-rows-10 gap-2 h-auto mx-auto text-black items-center">
          {filteredCars.map((auto) => (
            <div key={auto.id}>
              <Card auto={auto} />
              <button
                onClick={() => handleDeleteCar(auto.id)}
                className="mt-0 m-20 px-4 py-2 bg-red-500 text-white"
              >
                Eliminar
              </button>
            </div>
          ))}
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

export default DeleteCar;
