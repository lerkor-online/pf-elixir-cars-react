import { useState, useEffect } from 'react';

const ButtonAddCart = ({ car }) => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoAlmacenado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoAlmacenado);
  }, []);

  const isCarInCart = (carId) => {
    return carrito.some((item) => item.id === carId);
  };

  const handleCartItem = (e) => {
    e.preventDefault();
    if (!isCarInCart(car.id)) {
      const carritoActualizado = [...carrito, car];
      setCarrito(carritoActualizado);
      localStorage.setItem('carrito', JSON.stringify(carritoActualizado));
      console.log(carritoActualizado);
      localStorage.setItem('carrito_length', JSON.stringify(carritoActualizado.length));
      const _lengthCart = JSON.parse(localStorage.getItem('carrito_length')) || 0;
      console.log(_lengthCart);
      alert('Su artículo fue agregado al carrito');
    } else {
      alert('El coche ya está en el carrito');
    }
  };

  return (
    <button
      className='bg-transparent text-black border-2 border-black mb-0 font-semibold font-arial text-base leading-4 tracking-normal p-3 w-auto rounded-md hover:bg-gradient-to-r from-yellow-800 to-yellow-500 shadow-2xl'
      onClick={handleCartItem}
    >
      Agregar al carrito
    </button>
  );
};

export default ButtonAddCart;