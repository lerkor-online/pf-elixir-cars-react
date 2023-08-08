import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  const paypalClientID = 'AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u';

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00', // Monto del pago
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    // Se ejecuta cuando el pago es aprobado
    console.log('Pago aprobado:', data);
    return actions.order.capture();
  };

  const onError = (error) => {
    // Se ejecuta cuando ocurre un error en el pago
    console.error('Error en el pago:', error);
  };

  return (
    <PayPalScriptProvider options={{ 'client-id': paypalClientID }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;


/* import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


// Componente donde se muestra el botón de pago que basado en sus props define el monto y el product a cobrar

// Componente donde se muestra el botón de pago
export function PayPalButtonComponent({ precio, nombre }) {
  const clientId = "AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u";

  // Manejar la lógica después de un pago exitoso
  const handlePaymentSuccess = (details, data) => {
    console.log("Pago realizado con éxito:", details);
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          // Lógica para crear la orden de pago
          return actions.order.create({
            application_context: {
                //Orden exitosa
                return_url: "http://localhost:3000/complete",
                //orden cancelada
                cancel_url: "http://localhost:3000/cancel",
            },
            purchase_units: [
              {
                reference_id: "Compra de prueba ",
                description: `Compra de ${nombre}`,
                amount: {
                    value: 200,
                item_total: {
                  value: precio, // Cambiar al valor que desees cobrar
                }
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          // Lógica después de que el usuario apruebe el pago
          return actions.order.capture().then(function (details) {
            handlePaymentSuccess(details, data);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
 */