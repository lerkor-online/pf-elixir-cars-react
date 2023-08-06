import React, {useEffect} from 'react'
import Dashboard1 from '../../img/Dashboard1.jpg'
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

export default Menu;