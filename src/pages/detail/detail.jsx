import { useState, useEffect } from "react";
import axios from "axios";
import ButtonAddCart from "../../components/buttonAddCart/buttonAddCart";
import { useParams, useNavigate } from "react-router-dom";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";
import carengine from "../../assets//IconsDetail/car-engine.png";
import carpassenger from "../../assets/IconsDetail/car-passenger.png";
import carhatch from "../../assets/IconsDetail/car-hatch.png";
import cartransmission from "../../assets/IconsDetail/car-transmission.png";
import cartraction from "../../assets/IconsDetail/car-traction.png";
import cartires from "../../assets/IconsDetail/car-tires.png";
import carpower from "../../assets/IconsDetail/car-power.png";
import carkey from "../../assets/IconsDetail/car-key.png";
import cartrunk from "../../assets/IconsDetail/car-trunk.png";
import carairbag from "../../assets/IconsDetail/car-airbag.png";

export default function CarDetail() {
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(
          `https://pf-elixir-cars-back-production.up.railway.app/cars/${id}`
        );
        setCar(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCarDetail();
  }, [id]);

  // Check if the car data is still loading or if it's not available
  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="h-20"></header>
      <section className="w-9/12 mx-auto">
        <div className="grid grid-cols-2 items-center m-8">
          <div className="flex justify-center ">
            <img
              src={car.imageUrl}
              alt="Car Img"
              className=" rounded-3xl shadow-2xl"
              width={400}
              height={400}
            />
          </div>
          <div>
            <h1 className="font-bold font-MiAvenirRegular text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
              {car.brand.name}
            </h1>
            <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
              {car.presentacion}
            </span>
            <p className="text-xs font-bold uppercase tracking-wide mt-4 mb-0">
              Precio
            </p>
            <p className="text-3xl font-bold">U$D {car.precio}</p>
            <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
              <span className="mr-6">Compartir</span>
              <div className="flex flex-row">
                <img
                  src={facebook}
                  alt="facebook.png"
                  width={15}
                  height={13}
                  className="mx-4 cursor-pointer backdrop-brightness-2xl"
                />
                <img
                  src={twitter}
                  alt="twitter.png"
                  width={15}
                  height={13}
                  className="mx-4 cursor-pointer"
                />
                <img
                  src={whatsapp}
                  alt="whatsapp.png"
                  width={15}
                  height={15}
                  className="mx-4 cursor-pointer"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
            </div>
            <div></div>
            <button
              className="bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-yellow-800 to-yellow-500 shadow-2xl"
              onClick={() =>
                navigate(`/paypal-button/${car.precio}/${car.brand.name}`)
              }
            >
              Comprar
            </button>

            <ButtonAddCart car={car} />
            <div className="mt-3 text-sm text-gray-600">
              Foto no contractual, el precio y equipamiento podrán variar sin
              previo aviso. No incluye gastos de flete y patentamiento.
            </div>
          </div>
        </div>
      </section>
      <h2 className="text-4xl font-semibold p-4 text-center">
        Caracteristicas Principales
      </h2>
      <section className="grid grid-cols-5 w-auto p-12">
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carengine} alt="car-engine.png" width={50} height={50} />
            {car.fichaTecnica?.motor}
          </p>
          <p>Motor</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img
              src={carpassenger}
              alt="car-passenger.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.pasajeros}
          </p>
          <p>Pasajeros</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carhatch} alt="car-hatch.png" width={50} height={50} />
            {car.fichaTecnica?.carroceria}
          </p>
          <p>Carrocería</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center capitalize">
            <img
              src={cartransmission}
              alt="car-transmission.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.transmision}
          </p>
          <p>Transmisión</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img
              src={cartraction}
              alt="car-traction.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.traccion}
          </p>
          <p>Tracción</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={cartires} alt="car-tires.png" width={50} height={50} />
            {car.fichaTecnica?.llantas}
          </p>
          <p>Llantas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carpower} alt="car-power.png" width={50} height={50} />
            {car.fichaTecnica?.potencia}
          </p>
          <p>Potencia</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carkey} alt="car-key.png" width={50} height={50} />
            {car.fichaTecnica?.puertas}
          </p>
          <p>Puertas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={cartrunk} alt="car-trunk.png" width={50} height={50} />
            {car.fichaTecnica?.baul}
          </p>
          <p>Baúl</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carairbag} alt="car-airbag.png" width={50} height={50} />
            {car.fichaTecnica?.airbag}
          </p>
          <p>Airbags</p>
        </div>
      </section>
    </div>
  );
}

/* import { useState, useEffect } from "react";
import axios from "axios";
import ButtonAddCart from "../../components/buttonAddCart/buttonAddCart";
import { useParams, useNavigate } from "react-router-dom";
import facebook from "../../assets/SocialIcons/facebook.png";
import twitter from "../../assets/SocialIcons/twitter.png";
import whatsapp from "../../assets/SocialIcons/whatsapp.png";
import carengine from "../../assets//IconsDetail/car-engine.png";
import carpassenger from "../../assets/IconsDetail/car-passenger.png";
import carhatch from "../../assets/IconsDetail/car-hatch.png";
import cartransmission from "../../assets/IconsDetail/car-transmission.png";
import cartraction from "../../assets/IconsDetail/car-traction.png";
import cartires from "../../assets/IconsDetail/car-tires.png";
import carpower from "../../assets/IconsDetail/car-power.png";
import carkey from "../../assets/IconsDetail/car-key.png";
import cartrunk from "../../assets/IconsDetail/car-trunk.png";
import carairbag from "../../assets/IconsDetail/car-airbag.png";

export default function CarDetail() {
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id)

  const crearOrden = () => {
    // redireccion para con id de product, precio y nombre
    
  }
  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(
          `https://pf-elixir-cars-back-production.up.railway.app/cars/${id}`
        );
        setCar(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchCarDetail();
  }, [id]);

  // Check if the car data is still loading or if it's not available
  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="h-20"></header>
      <section className="w-9/12 mx-auto">
        <div className="grid grid-cols-2 items-center m-8">
          <div className="flex justify-center ">
            <img
              src={car.imageUrl}
              alt="Car Img"
              className=" rounded-3xl shadow-2xl"
              width={400}
              height={400}
            />
          </div>
          <div>
            <h1 className="font-bold font-MiAvenirRegular text-5xl leading-16 flex items-center text-[#332F2E] m-0 uppercase">
              {car.brand.name}
            </h1>
            <span className="first-letter:text-left text-[#332F2E] leading-14 text-xl uppercase mb-3">
              {car.presentacion}
            </span>
            <p className="text-xs font-bold uppercase tracking-wide mt-4 mb-0">
              Precio
            </p>
            <p className="text-3xl font-bold">U$D {car.precio}</p>
            <div className="mt-3 mb-3 pt-3 pb-3 flex text-left text-sm text-gray-600 border-t border-b border-gray-400">
              <span className="mr-6">Compartir</span>
              <div className="flex flex-row">
                <img
                  src={facebook}
                  alt="facebook.png"
                  width={15}
                  height={13}
                  className="mx-4 cursor-pointer backdrop-brightness-2xl"
                />
                <img
                  src={twitter}
                  alt="twitter.png"
                  width={15}
                  height={13}
                  className="mx-4 cursor-pointer"
                />
                <img
                  src={whatsapp}
                  alt="whatsapp.png"
                  width={15}
                  height={15}
                  className="mx-4 cursor-pointer"
                  style={{ filter: "grayscale(100%)" }}
                />
              </div>
            </div>
            <div></div>
            <button className='bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 mr-3 w-28 rounded-md hover:bg-gradient-to-r from-yellow-800 to-yellow-500 shadow-2xl'>Comprar</button>
            <ButtonAddCart car={car}/>            
            <div className='mt-3 text-sm text-gray-600'>Foto no contractual, el precio y equipamiento podrán variar sin previo aviso. No incluye gastos de flete y patentamiento.</div>
          </div>
        </div>
      </section>
      <h2 className="text-4xl font-semibold p-4 text-center">
        Caracteristicas Principales
      </h2>
      <section className="grid grid-cols-5 w-auto p-12">
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carengine} alt="car-engine.png" width={50} height={50} />
            {car.fichaTecnica?.motor}
          </p>
          <p>Motor</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img
              src={carpassenger}
              alt="car-passenger.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.pasajeros}
          </p>
          <p>Pasajeros</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carhatch} alt="car-hatch.png" width={50} height={50} />
            {car.fichaTecnica?.carroceria}
          </p>
          <p>Carrocería</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center capitalize">
            <img
              src={cartransmission}
              alt="car-transmission.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.transmision}
          </p>
          <p>Transmisión</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img
              src={cartraction}
              alt="car-traction.png"
              width={50}
              height={50}
            />
            {car.fichaTecnica?.traccion}
          </p>
          <p>Tracción</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={cartires} alt="car-tires.png" width={50} height={50} />
            {car.fichaTecnica?.llantas}
          </p>
          <p>Llantas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carpower} alt="car-power.png" width={50} height={50} />
            {car.fichaTecnica?.potencia}
          </p>
          <p>Potencia</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carkey} alt="car-key.png" width={50} height={50} />
            {car.fichaTecnica?.puertas}
          </p>
          <p>Puertas</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={cartrunk} alt="car-trunk.png" width={50} height={50} />
            {car.fichaTecnica?.baul}
          </p>
          <p>Baúl</p>
        </div>
        <div className="p-4 flex items-center flex-col">
          <p className="font-semibold text-center">
            <img src={carairbag} alt="car-airbag.png" width={50} height={50} />
            {car.fichaTecnica?.airbag}
          </p>
          <p>Airbags</p>
        </div>
      </section>
    </div>
  );
} */