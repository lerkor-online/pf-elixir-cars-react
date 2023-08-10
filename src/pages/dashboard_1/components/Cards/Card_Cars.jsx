import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscTrash } from "react-icons/vsc";
import SearchBar from "../../../../components/SearchBar/SearchBar";

const URL = "http://localhost:3001/cars";
const limit = 1000;


const CardCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchCars(page) {
      try {
        const response = await axios.get(`${URL}?page=${page}&limit=${limit}`);
        setCars(response.data.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCars(currentPage);
  }, [currentPage]);

  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedCars([...selectedCars, id]);
    } else {
      setSelectedCars(selectedCars.filter((selectedId) => selectedId !== id));
    }
  };

  const handleDeleteCars = async () => {
    try {
      for (const id of selectedCars) {
        await axios.delete(`${URL}/${id}`);
      }
      const response = await axios.get(URL);
      setCars(response.data.data);
      setSelectedCars([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchBarReset = () => {
    setIsSearching(false);
    setSearchQuery("");
    setCurrentPage(1);

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
      <button
        onClick={handleDeleteCars}
        disabled={selectedCars.length === 0}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4 mt-0"
      >
        <VscTrash className="w-4 h-4 cursor-pointer" />
      </button>
    
        <div  className="w-fit m-auto flex justify-right">
        <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearching={isSearching} // Paso  isSearching como prop
            setIsSearching={setIsSearching} // Paso setIsSearching como prop
            setCurrentPage={setCurrentPage} // Pasa setCurrentPage como prop
            handleSearchBarReset={handleSearchBarReset} // Paso la función handleSearchBarReset como prop
          />

        </div>
      <table className="table border-collapse w-full">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nro
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marca
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modelo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Presentación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Año
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Selecc
            </th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCars.map((auto,index) => (
            <tr key={auto.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{auto.brand.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{auto.carModel.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{auto.presentacion}</td>
              <td className="px-6 py-4 whitespace-nowrap">{auto.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, auto.id)}
                  className="ml"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default CardCars;
