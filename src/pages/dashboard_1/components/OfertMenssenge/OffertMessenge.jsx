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
      /* const response = await axios.post("http://localhost:3001/send", formData); */
      const response = await axios.post("https://pf-elixir-cars-back-production.up.railway.app/send", formData);
      console.log(response);
    } catch (error) {
      console.log("Error al enviar el mensaje", error);
    }
  };

  return (
    <div className="flex bg-slate-100 flex-col m-auto min-h-[100%] max-h-[100%] w-[100%] items-center justify-center my-20">
      <form className="flex flex-col h-[500px] w-[50%] items-center border-2 shadow-glass-card shadow-slate-500 rounded-lg ">
        <div className=" h-[100%] w-[50%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-6">SEND OFERT</h1>

          <div className=" w-[80%] ">
            <label htmlFor="subject" className="font-bold">
              To
            </label>
            <div className=" w-[100%] text-black bg-slate-5 border-20 rounded-lg mb-2">
              <input
                type="email"
                id="email"
                value={formData.to}
                onChange={handlerChangeTo}
                placeholder="To"
                className="w-full px-2 py-1 border-2 rounded-lg border-white border-b-blue-600 m-auto"
              />
            </div>
          </div>
          <div className=" w-[80%] ">
            <label htmlFor="subject" className="font-bold">
              Subjet:
            </label>
            <div className="w-[100%] text-black bg-slate-50 border-2 rounded-lg mb-2">
              <input
                type="text"
                value={formData.subject}
                onChange={handlerChangeSubjet}
                placeholder="Subject"
                className="w-full px-2 py-1 border-2 rounded-lg border-white border-b-blue-600 m-auto"
              />
            </div>
          </div>

          <div className=" w-[80%] ">
            <label htmlFor="subject" className="font-bold">
              Message:
            </label>
            <div>
              <textarea
                value={formData.text}
                onChange={handlerChangeMessage}
                placeholder="Escribe tu mensaje aquí"
                className="border border-gray-300 rounded px-4 py-2 w-80 h-40 mb-4"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 mb-8 rounded-lg transition duration-300 hover:shadow-md shadow-[#555555] hover:text-gray-900 hover:bg-[#FFD700] "
          >
            Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
}

export default OffertMessenge;
