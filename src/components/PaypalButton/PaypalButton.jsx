import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from 'react-router-dom';
import compra from '../../assets/compra_paypal.png'

export function PayPalButton() {
  const clientId = "AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u";

  const [purchaseId, setPurchaseId] = useState(null);
  const { precio, nombre } = useParams();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePaymentSuccess = (details, data) => {
    console.log("Pago realizado con éxito:", details);
    setPurchaseId(details.purchase_units[0].payments.captures[0].id);
    setIsCompleted(true);
  };

  const handleCancel = () => {
    setIsCancelled(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div style={{ width: '50%' }}>
          {isCancelled ? (
            <div>
              <h2>Compra cancelada.</h2>
              <p>Has cancelado la compra de {nombre}.</p>
            </div>
          ) : isCompleted ? (
            <div style={{ textAlign: 'center', backgroundColor: '#dff0d8', border: '1px solid #c3e6cb',  borderRadius: '5px' }}>
              <h2 style={{ color: '#28a745' }}>¡Seña completada!</h2>
              <p style={{ color: '#333' }}>Tu seña de {nombre} ha sido exitosa.</p>
              <p style={{ color: '#333' }}>ID de seña: {purchaseId}</p>
              <p style={{ color: '#333' }}>Gracias por elegirnos.</p>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img src={compra} alt="Felicidad" style={{ Width: '100px',  }} />
              </div>
            </div>
          ) : (
            <div>
              <PayPalButtons
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    application_context: {},
                    purchase_units: [
                      {
                        reference_id: "Compra de prueba",
                        description: `Compra de ${nombre}`,
                        amount: {
                          value: precio,
                          item_total: {
                            value: precio,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    handlePaymentSuccess(details, data);
                  });
                }}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;




// Código con botón de débito/crédito quitado
/* import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from 'react-router-dom';

export function PayPalButton() {
  const clientId = "AVEb_6nyKhKDoS1J27I2AiAdYH3r0qD-GUwkHptOALusT7-kTlhjgG8adJFy39QVrt80CiozaAFb6P3u";

  const [purchaseId, setPurchaseId] = useState(null);
  const { precio, nombre } = useParams();
  const [isCancelled, setIsCancelled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Manejar la lógica después de un pago exitoso
  const handlePaymentSuccess = (details, data) => {
    console.log("Pago realizado con éxito:", details);
    setPurchaseId(details.purchase_units[0].payments.captures[0].id);
    setIsCompleted(true);
  };

  // Manejar la cancelación de la compra
  const handleCancel = () => {
    setIsCancelled(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <PayPalScriptProvider options={{ "client-id": clientId }}>
        <div style={{ width: '50%' }} >
          {isCancelled ? (
            <div>
              <h2>Compra cancelada.</h2>
              <p>Has cancelado la compra de {nombre}.</p>
            </div>
          ) : isCompleted ? (
            <div>
              <h2>¡Compra completada!</h2>
              <p>Tu compra de {nombre} ha sido exitosa.</p>
              <p>ID de compra: {purchaseId}</p>
              <p>Gracias por elegirnos.</p>
            </div>
          ) : (
            <div>
              <PayPalButtons
                style={{ layout: 'horizontal', fundingicons: 'false' }} // Agrega esta línea para ocultar los iconos de métodos de pago
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    application_context: {},
                    purchase_units: [
                      {
                        reference_id: "Compra de prueba",
                        description: `Compra de ${nombre}`,
                        amount: {
                          value: precio,
                          item_total: {
                            value: precio,
                          },
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then(function (details) {
                    handlePaymentSuccess(details, data);
                  });
                }}
                onCancel={handleCancel}
              />
            </div>
          )}
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;
 */