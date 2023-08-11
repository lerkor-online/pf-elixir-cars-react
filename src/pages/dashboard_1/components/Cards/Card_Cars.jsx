import React, { useState, useEffect } from "react";
import axios from "axios";
import { VscTrash } from "react-icons/vsc";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import { BsPencil } from "react-icons/bs";
import Modal from "react-modal"; // Importamos react-modal


const URL = "https://pf-elixir-cars-back-production.up.railway.app/cars";
const limit = 1000;


const CardCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [editedCar, setEditedCar] = useState(null); // Estado para el auto en edición
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const handleEditCar = (car) => {
    setEditedCar(car); // Guardamos el auto en edición
    setIsModalOpen(true); // Abrimos el modal
  };

  const handleSaveEdit = async () => {
    // Implementar la lógica para guardar los cambios en el auto
    try {
      // Hacer la solicitud PUT para actualizar el auto en el servidor
      await axios.put(`${URL}/${editedCar.id}`, {
        price: editedCar.price,
        stock: editedCar.stock,
      });

      // Actualizar la lista de autos después de guardar los cambios
      const response = await axios.get(URL);
      setCars(response.data.data);

      // Cerrar el modal y limpiar el auto en edición
      setIsModalOpen(false);
      setEditedCar(null);
    } catch (error) {
      console.log(error);
    }
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
              Selec
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
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
              <td className="px-6 py-4 whitespace-nowrap">
                <BsPencil
                  className="w-4 h-4 cursor-pointer text-blue-500"
                  onClick={() => handleEditCar(auto)} // Agregamos el manejador de edición
                />
                  </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Editar Auto"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="w-150 h-150 bg-gray-300 rounded-lg p-4 flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold mb-2">Editar Auto</h2>
        {editedCar && (
          <div className="flex flex-col items-center">
            <label className="mb-2">Precio:</label>
            <input
              type="number"
              value={editedCar.price}
              onChange={(e) =>
                setEditedCar({ ...editedCar, price: e.target.value })
              }
            />
            <label className="mb-2">Stock:</label>
            <input
              type="number"
              value={editedCar.stock}
              onChange={(e) =>
                setEditedCar({ ...editedCar, stock: e.target.value })
              }
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSaveEdit}>Guardar</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setIsModalOpen(false)}>Cancelar</button>
          </div>
        )}
        </div>
      </Modal>
      </div>   
  );
};

export default CardCars;
