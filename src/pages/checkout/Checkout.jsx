import React from 'react';
import PayPalButton from '../../components/PaypalButton/PaypalButton';

const App = () => {
  return (
    <div>
      <h1>Mi Pasarela de Pago con PayPal</h1>
      <PayPalButton />
    </div>
  );
};

export default App;

/* import { useState, useEffect } from "react";
import {PayPalButtonComponent} from '../../components/PaypalButton/PaypalButton';

// checkout recibira por params el id del product con su precio y nombre.  y a su vez se lo psa al componente de paypal button

export default function Checkout(props) {
    const precio = props.precio || 200;
    const nombre = props.nombre || "Nombre";
  return (
    <div>
      <header className="h-20"></header>
      <section className="w-9/12 mx-auto">
            <PayPalButtonComponent precio={precio} nombre={nombre}/>
      </section>
    </div>
  );
} */
