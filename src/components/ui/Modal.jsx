const Modal = ({ setShowModal }) => {
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed z-10">
      <div
        onClick={onClose}
        className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
      ></div>
      <section className="bg-white z-10 p-10 flex flex-col text-center rounded-2xl">
        <h2 className="font-bold text-2xl">Suscripcion exitosa!</h2>
        <p>Te has suscrito ha nuestras noticias</p>
      </section>
    </div>
  );
};

export default Modal;
