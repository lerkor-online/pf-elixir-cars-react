import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export function PayPalButton({ precio, nombre }) {
  const clientId = "AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u";

  const [purchaseId, setPurchaseId] = useState(null); // Estado para almacenar la ID de compra

  // Manejar la lógica después de un pago exitoso
  const handlePaymentSuccess = (details, data) => {
    console.log("Pago realizado con éxito:", details);
    setPurchaseId(details.purchase_units[0].payments.captures[0].id); // Asigna la ID de compra
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div style={{ width: '50%' }} >
          {purchaseId ? (
            <div>
              <h2>Seña exitosa.
                Gracias por elegirnos.
              </h2>
              <p>ID de seña: {purchaseId} </p>
            </div>
          ) : (
            <div>
              <h2>Pago con PayPal</h2>
              <PayPalButtons
                createOrder={(_data, actions) => {
                  // Lógica para crear la orden de pago
                  return actions.order.create({
                    application_context: {
                      // Orden exitosa
                      return_url: "http://localhost:3000/complete",
                      // Orden cancelada
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
                          },
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
            </div>
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}
export default PayPalButton;
 


/* import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export function PayPalButton({ precio, nombre }) {
  const clientId = "AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u";

  // Manejar la lógica después de un pago exitoso
  const handlePaymentSuccess = (details, data) => {
    console.log("Pago realizado con éxito:", details);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div style={{ width: '50%' }}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(_data, actions) => {
              // Lógica para crear la orden de pago
              return actions.order.create({
                application_context: {
                    // Orden exitosa
                    return_url: "http://localhost:3000/complete",
                    // Orden cancelada
                    cancel_url: "http://localhost:3000/cancel",
                },
                purchase_units: [
                  {
                    reference_id: "Compra de prueba",
                    description: `Compra de ${nombre}`,
                    amount: {
                      value: precio,
                      currency_code: 'USD', // Cambiar a la moneda deseada
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
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;
 */


/* import React from 'react';
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

export default PayPalButton; */