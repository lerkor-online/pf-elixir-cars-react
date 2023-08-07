import React, { useState } from "react";

function Stock({ marca }) {
  const [brandList, setBrandList] = useState(marca);
  const [modelList, setModelList] = useState([]);

  // Variables para "Añadir al inventario"
  const [inventoryBrand, setInventoryBrand] = useState("");
  const [inventoryModel, setInventoryModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const [isAddingBrand] = useState(false);

  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    presentacion: "",
    precio: 0,
    estado: "",
    year: 0,
    imageUrl: [],
    kilometraje: "",
    combustible: "",
    fichaTecnica: {
      Motor: "",
      Pasajeros: "",
      Carroceria: "",
      Transmision: "",
      Traccion: "",
      Llantas: "",
      Potencia: "",
      Puertas: "",
      Baul: "",
      airbag: "",
    },
  });

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:3001/brands", {
        next: {
          revalidate: 10,
        },
      });
      const brands = await response.json();
      setBrandList(brands);
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
    }
  };

  const fetchModels = async (brandName) => {
    console.log(brandName);
    try {
      const response =
        brandName !== "add"
          ? await fetch(`http://localhost:3001/carModels?brand=${brandName}`, {
              next: {
                revalidate: 10,
              },
            })
          : null;

      console.log(response);
      const models = await response?.json();
      setModelList(models);
    } catch (error) {
      console.error("Error al obtener los modelos:", error);
    }
  };

  const handleBrandSelection = (e) => {
    const selectedBrand = e.target.value;

    setInventoryBrand(selectedBrand);
    fetchModels(selectedBrand);
  };

  const handleModelSelection = (e) => {
    const selectedModel = e.target.value;
    console.log(selectedModel);

    setInventoryModel(selectedModel);

    // fetchYears(selectedBrand, selectedModel)
  };
  const handleYearSelection = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
  };

  const handleStateSelection = (e) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
  };

  const handleInventorySubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    // const jsonData = JSON.stringify(combinedData);
    // axios
    //   .post("http://localhost:3001/cars?stock=value", jsonData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <form
      onSubmit={handleInventorySubmit}
      className="flex flex-row m-auto w-fit"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center">
          AÑADE AL INVENTARIO
        </h2>

        <div className="flex flex-row m-auto w-fit">
          <div>
            <select
              className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
              value={inventoryBrand}
              onChange={handleBrandSelection}
              disabled={isAddingBrand}
            >
              <option className="m-1" disabled value="">
                Seleccione una Marca
              </option>

              {Array.isArray(brandList) && brandList.length > 0 ? (
                brandList.map((marca) => (
                  <option key={marca.id} value={marca.name}>
                    {marca.name}
                  </option>
                ))
              ) : (
                <option disabled className="text-green-500">
                  Cargando marcas...
                </option>
              )}
            </select>
          </div>

          <div>
            <select
              className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
              value={inventoryModel}
              onChange={handleModelSelection}
              disabled={!inventoryBrand || isAddingBrand}
            >
              <option className="m-1" value="">
                Seleccione un Modelo
              </option>

              {Array.isArray(modelList) &&
                modelList?.map((model, index) => (
                  <option key={index} value={model.name}>
                    {model.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-fit">
            <select
              className="border border-gray-300 rounded w-fit px-4 py-2 my-4 mx-2"
              value={selectedYear}
              onChange={(e) => {
                handleYearSelection(e);
              }}
              disabled={!inventoryBrand || !inventoryModel || isAddingBrand}
            >
              <option className="m-1 " value="">
                Selecciona el Año
              </option>

              {Array.isArray(formData) &&
                formData.map((element, index) => (
                  <option key={index} value={element.year}>
                    {element.year}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <select
              value={selectedState}
              onChange={handleStateSelection}
              disabled={!inventoryBrand || !inventoryModel || isAddingBrand}
              className="border border-gray-300 rounded px-4 py-2 my-4 mx-2"
            >
              <option value="">Estado</option>
              {brandList ? (
                <>
                  <option className="m-1" value="Nuevo">
                    🟢 Nuevo
                  </option>
                  <option className="m-1" value="Usado">
                    🟠 Usado
                  </option>
                </>
              ) : null}
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700]"
          >
            AÑADIR VEHICULO
          </button>
        </div>
      </div>
    </form>
  );
}

export default Stock;
