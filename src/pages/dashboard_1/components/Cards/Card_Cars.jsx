import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscTrash } from "react-icons/vsc";


const URL = "https://pf-elixir-cars-back-production.up.railway.app/cars";

const CardCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchCars(page) {
      try {
        const response = await axios.get(`${URL}?page=${page}`);
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
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <button
        onClick={handleDeleteCars}
        disabled={selectedCars.length === 0}
        className="bg-red-500 text-white py-2 px-4 rounded mb-4 mt-0"
      >
        <VscTrash className="w-4 h-4 cursor-pointer" />
      </button>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                currentPage === index + 1 ? "bg-red-500 text-white" : "bg-white text-gray-700"
              } relative inline-flex items-center px-4 py-2 border text-sm font-medium mt-0 ml-10`} 
            >
              {index + 1}
            </button>
          ))}
        </nav>
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
          {cars.map((auto,index) => (
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
