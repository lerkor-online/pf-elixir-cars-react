import Logo from "../../assets/Image/logo_elixir_cars.png";

const Modal = ({ setShowModal, title, text }) => {
  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed z-40">
      <div
        onClick={onClose}
        className="fixed grid place-content-center bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden  bg-fixed "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
      ></div>
      <section className="bg-white z-20 p-10 flex flex-col items-center justify-center max-w-lg text-center rounded-2xl">
        <h2 className="font-bold text-2xl pb-5">{title}</h2>
        {/* Suscripcion exitosa! */}
        <p className="pb-5">{text}</p>
        {/* Te has suscrito ha nuestras noticias */}
        <img src={Logo} className="w-40 m-0" />
      </section>
    </div>
  );
};

export default Modal;