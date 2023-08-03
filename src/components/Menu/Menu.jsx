import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { ImEarth } from 'react-icons/im';
import { BsCloudy } from 'react-icons/bs';
import { BsCameraVideo } from 'react-icons/bs';
import { BsPlayBtn } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { CiWallet } from 'react-icons/ci';
import { AiOutlineCalculator } from 'react-icons/ai';
import { BsHeadphones } from 'react-icons/bs';
import { AiOutlinePoweroff } from 'react-icons/ai';
import '../Menu/Menu.css';

const Menu = () => {
  return (
    <section>
      <div className="w-full">
        <div className="menu-container">
          <MenuItem icon={<BiHomeAlt />} />
          <MenuItem icon={<ImEarth />} />
          <MenuItem icon={<BsCloudy />} />
          <MenuItem icon={<BsCameraVideo />} />
          <MenuItem icon={<BsPlayBtn />} />
          <MenuItem icon={<CgProfile />} />
          <MenuItem icon={<CiWallet />} />
          <MenuItem icon={<AiOutlineCalculator />} />
          <MenuItem icon={<BsHeadphones />} />
          <MenuItem icon={<AiOutlinePoweroff />} isLast />
        </div>
      </div>
    </section>
  );
};

const MenuItem = ({ icon, isLast }) => {
  return (
    <div className={`menu-item ${isLast ? 'mt-10' : ''}`}>
      <div className="menu-icon">{icon}</div>
    </div>
  );
};

export default Menu;


/* import React, {useEffect} from 'react'
import Dashboard1 from '../img/Dashboard1.jpg';
import './Menu.css'
import { FaUserCircle,FaUserAlt, FaUserCheck, FaUserCog,FaSignOutAlt } from "react-icons/fa";

function Menu() {
 useEffect(() => {
   const mainMenuLi = document
   .getElementById('mainMenu')
   .querySelectorAll("li")
   function changeActive () {
    mainMenuLi.forEach(n => n.classList.remove("active"))
    this.classList.add('active')
   }

mainMenuLi.forEach(n => n.addEventListener('click', changeActive))

 })
  return (
    <menu className="menu">
      <img src={Dashboard1} alt=""/>
      <ul id='mainMenu'>
  <Icon icon={< FaUserCircle/>} />
  <Icon icon={< FaUserAlt/>} />
  <Icon icon={< FaUserCheck/>} />
      </ul>

      <ul className='lastMenu'>
      <Icon icon={< FaUserCog/>} /> 
      <Icon icon={<FaSignOutAlt/>} />
      </ul>
    </menu>
  )
}

const Icon = ({ icon }) => (
  <li>
    <a href="#">{icon}</a>
  </li>
)

export default Menu; */