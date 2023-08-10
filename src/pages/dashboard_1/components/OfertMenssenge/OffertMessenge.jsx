import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function OffertMessenge() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
  });

  const handlerChangeTo = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      to: value,
    }));
  };

  const handlerChangeSubjet = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      subject: value,
    }));
  };

  const handlerChangeMessage = (e) => {
    const { value } = e.target;
    console.log(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      text: value,
    }));
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/send", formData);
      console.log(response);
    } catch (error) {
      console.log("Error al enviar el mensaje", error);
    }
  };

  return (
    <form>
      <div className=" w-[50%] flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Enviar Oferta</h1>

        <div className=" border-2 text-black bg-slate-50 rounded-lg mb-2">
          <input
            type="email"
            value={formData.to}
            onChange={handlerChangeTo}
            className="w-full px-2 py-1 border-2 rounded-lg border-white border-b-blue-600 m-auto"
          />
        </div>

        <div className="border-2 text-black bg-slate-50 rounded-lg mb-2">
          <input
            type="text"
            value={formData.subject}
            onChange={handlerChangeSubjet}
            className="w-full px-2 py-1 border-2 rounded-lg border-white border-b-blue-600 m-auto"
          />
        </div>

        <div>
          <textarea
            value={formData.text}
            onChange={handlerChangeMessage}
            placeholder="Escribe tu mensaje aquí"
            className="border border-gray-300 rounded px-4 py-2 w-80 h-40 mb-4"
          />
        </div>
        <button
          type="submit"
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enviar Mensaje
        </button>
      </div>
    </form>
  );
}

export default OffertMessenge;
