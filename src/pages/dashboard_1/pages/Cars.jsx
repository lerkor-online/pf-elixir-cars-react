import React, { useState } from "react";
import AddCars from "../../create/AddCars";
import Stock from "../../stock/Stock";
import DeleteCar from "../../../components/deleteCar/deleteCar";

function Cars() {
  const [activeOption, setActiveOption] = useState("crear-auto");

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const renderOptionContent = () => {
    switch (activeOption) {
      case "crear-auto":
        return <AddCars />;
      case "administrar-auto":
        return <Stock />;
      case "eliminar-auto":
        return < DeleteCar />;
      default:
        return <AddCars />;
    }
  };

  return (
    <div className="flex flex-col m-auto min-h-full min-w-full ">
      <div className="min-h-[6vh] flex space-x-4 p-0 border-2 text-black bg-slate-300 rounded-lg mt-2">
        <button
          className={`px-4 py-2 ${activeOption === "crear-auto" ? "bg-gray-400" : "bg-gray-200"}`}
          onClick={() => handleOptionChange("crear-auto")}
        >
          Crear Auto
        </button>
        <button
          className={`px-4 py-2 ${activeOption === "administrar-auto" ? "bg-gray-400" : "bg-gray-200"}`}
          onClick={() => handleOptionChange("administrar-auto")}
        >
         Administrar Auto
        </button>
        <button
          className={`px-4 py-2 ${activeOption === "eliminar-auto" ? "bg-gray-400" : "bg-gray-200"}`}
          onClick={() => handleOptionChange("eliminar-auto")}
        >
          Eliminar Auto
        </button>
   
      </div>
      <div className=" p-4 text-black bg-slate-300 rounded-lg mt-2 min-h-[91vh] max-h-[91vh] overflow-auto">
        {renderOptionContent()}
      </div>
    </div>
  );
}

export default Cars;