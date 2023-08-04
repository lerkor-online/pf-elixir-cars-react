import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import {  FaChevronDown } from 'react-icons/fa';
import './Container.css'
import acertijo from '../img/person-9.png';


function Container() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div>
      Saludos
    </div>
   /*  <div className="Container">
      <div className="inputBox">
        <input type="text" placeholder="Search users" />
        <i>
          <BiSearchAlt />
        </i>
      </div>
      <div className="profileContainer">
       
        <div className="image">
          <img src={acertijo} alt="not found" />
        </div>
        <p className="profileName">Cristian Culo</p>
        <i className="menuChevron" id="menuChevron" onClick={handleMenuToggle}>
          <button className="buton"><FaChevronDown /></button>
        </i>
        {isMenuOpen && (
          <div className="menuContainer" id="menuContainer">
            <ul>
              <li>Opcion 1</li>
              <li>Opcion 2</li>
              <li>Opcion 3</li>
              <li>Opcion 4</li>
            </ul>
          </div>
        )}
      </div>
    </div> */
  );
}

export default Container;