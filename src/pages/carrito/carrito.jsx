import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Modal from '../../components/ui/Modal';

const URL = import.meta.env.VITE_REACT_APP_URL_BACKEND;

const Carrito = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [carritoDet, setCarritoDet] = useState(null);
    const UserInfo = JSON.parse(window.localStorage.getItem('user'));
    const [carDataCart, setCarDataCart] = useState(null);

    const handleDelete = async ()=>{
        const response = await axios.delete(`${URL}cartDetail/${carritoDet.id}`)
        /* alert("Carrito Vacio, serás redirigido a Home"); */
        setShowModal(true)
        setTimeout(() => {
            navigate("/home")
          }, "2000");
    }
    useEffect(() => {
        const fetchCartDetail = async () => {
            try {
                const response = await axios.get(
                    `${URL}cartDetails/${UserInfo.id}`
                    );
                    setCarritoDet(response.data[0]);
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            fetchCartDetail();
        }, []);
        
        console.log(carritoDet)
        
    useEffect(() => {
        if (carritoDet && carritoDet.carId) {
            const fetchCarDetail = async () => {
                try {
                    const response = await axios.get(
                        `${URL}cars/${carritoDet.carId}`
                    );
                    setCarDataCart(response.data);
                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };
            fetchCarDetail();
        }
    }, [carritoDet]);
    
    return (
        <div className="bg-white">
            <section className=" h-28"></section>
            <div className="flex flex-col items-center">
                <table className="border-collapse w-9/12 border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 border rounded-lg">
                            <th className="p-2"></th>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Subtotal</th>
                            <th className="p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {carDataCart && carDataCart.imageUrl && ( // Comprueba si carDataCart y imageUrl no son null
                            <tr>
                                <td className="p-2">
                                    <img
                                        src={carDataCart.imageUrl}
                                        alt="Producto"
                                        className="w-16 h-16 object-cover mx-auto"
                                    />
                                </td>
                                <td className="p-2 text-center">
                                    {carDataCart.presentacion}
                                </td>
                                <td className="p-2 text-center">
                                    {carDataCart.precio}
                                </td>
                                <td className="p-2 text-center">
                                    {carDataCart.precio}
                                </td>
                                <td className="p-2">
                                    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className='grid grid-cols-2 w-3/4 text-[#332F2E] font-bold'>
                    <div className='w-1/2'></div>
                    <div className='flex flex-col justify-end border rounded-lg'>
                        <section className=' text-center '>Total del carrito</section>
                        <section className='flex flex-col border rounded-lg'>
                            <div className='grid grid-cols-2 border rounded-lg '>
                                <div>Subtotal</div>
                                <div>USD {carDataCart?.precio || 0}</div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div>Cupón: reserva</div>
                                <div>- USD {(carDataCart?.precio || 0) - ((carDataCart?.precio || 0) * 0.025)}</div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div>Total</div>
                                <div> USD {(carDataCart?.precio || 0) * 0.025}</div>
                            </div>
                        </section>
                        <section><button   onClick={() =>
                navigate(`/paypal-button/${carDataCart.precio}/${carDataCart.brand.name}`)
              } className=' ml-72 bg-yellow-400 text-[#332F2E] font-bold'>Finalizar Compra</button></section>
                    </div>
                </div>
            </div>
            {showModal && <Modal setShowModal={setShowModal}
          title="Carrito Vacio, Seras Redirigido a Home"
          text=""
        ></Modal>}
        </div>
    );
};

export default Carrito;