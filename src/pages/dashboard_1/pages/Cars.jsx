import React, { useState } from "react";
import AddCars from "../../create_cars/AddCars";
import CardCars from "../components/Cards/Card_Cars";

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
        return <CardCars />;

      default:
        return <AddCars />;
    }
  };

  return (
    <div className="flex flex-col min-h-full min-w-full ">
      <div className="flex felx-row min-h-[6vh] max-h-[6vh]">
        <div className="flex felx-row h-full">
          <div className="relative h-12 top-8 ">
            <button
              className={`px-4 h-10 p-0 rounded-b-sm text-start ${
                activeOption === "crear-auto" ? "bg-gray-400" : "bg-gray-200"
              }`}
              onClick={() => handleOptionChange("crear-auto")}
            >
              Publicar Auto
            </button>
          </div>
          <div className="relative h-12 top-8">
            <button
              className={`px-4 h-10 p-0 rounded-b-sm text-start ${
                activeOption === "administrar-auto"
                  ? "bg-gray-400"
                  : "bg-gray-200"
              }`}
              onClick={() => handleOptionChange("administrar-auto")}
            >
              Administrar Auto
            </button>
            {/* <button
          className={`px-4 py-2 ${
            activeOption === "eliminar-auto" ? "bg-gray-400" : "bg-gray-200"
          }`}
          onClick={() => handleOptionChange("eliminar-auto")}
        >
          Eliminar Auto
        </button> */}
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-5 max-w-[100%]">
        <div className=" border-spacing-1 shadow-glass-card shadow-slate-500 text-black bg-white pt-2 min-w-[97%] min-h-[88vh] px-4 rounded-tr-md">
          {renderOptionContent()}
        </div>
      </div>
    </div>
  );
}

export default Cars;
