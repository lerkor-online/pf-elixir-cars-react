import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ auto }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      if (card) {
        const { left, top, width, height } = card.getBoundingClientRect();

        const mouseX = clientX - left;
        const mouseY = clientY - top;

        const rotateX = (mouseY / height - 0.5) * 20;
        const rotateY = (mouseX / width - 0.5) * 20;
        const scale = 1.1;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      }
    };

    const handleMouseOut = () => {
      if (card) {
        card.style.transform = "none";
      }
    };

    card?.addEventListener("mousemove", handleMouseMove);
    card?.addEventListener("mouseout", handleMouseOut);

    return () => {
      card?.removeEventListener("mousemove", handleMouseMove);
      card?.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const navigateHandler = () => {
    navigate(`/categoria-producto/0km/detail/${auto.id}`);
  };

  return (
    <div
      ref={cardRef}
      className="flex flex-col justify-center bg-white m-4 rounded-lg overflow-hidden w-[260px] relative transition-transform duration-300 transform-gpu shadow-glass-card shadow-[#a8a8a8] "
      style={{ transition: "transform 0.3s" }}
    >
      <img
        src={auto.imageUrl[0]}
        className="w-[260px] h-[206px]"
        alt={auto.modelo}
      />
      <div className="p-2 text-[#332F2E]">
        <h2 className="pl-2 mt-0 font-bold font-MiAvenirRegular text-16 leading-16 flex items-center text-[#332F2E] m-0 uppercase">
          {auto.brand?.name}
        </h2>

        <p className="pl-2 first-letter:text-left text-[#332F2E] leading-14 text-xs uppercase mb-3 truncate line-clamp-3 overflow-hidden">
          {auto.presentacion}
        </p>

        <div className="pl-2 mt-0">
          <p className="text-xs">Precio</p>
          <p className="text-xl font-bold">U$D {auto.precio}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={navigateHandler}
          className="bg-yellow-400 p-3 m-2 w-9/12 text-center rounded-lg shadow-lg rounded-4 text-[#332F2E] uppercase font-bold"
        >
          <span className=" text-black">VER MÁS</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
