import React, { useState } from 'react';
import Dashboard1 from '../img/Dashboard1.jpg';
import './Menu.css';
import { FaUserCircle, FaUserAlt, FaCar, FaUserCog, FaSignOutAlt } from 'react-icons/fa';

function Menu() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9\s-]+$/.test(phone);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserRole('user');
    setEmailError('');
    setPhoneError('');
  };

  const handleCreateUser = () => {
    if (newUserName && newUserEmail && newUserPhone) {
      if (!validateEmail(newUserEmail)) {
        setEmailError('Correo electrónico inválido');
        return;
      }
      if (!validatePhone(newUserPhone)) {
        setPhoneError('Teléfono inválido');
        return;
      }

      const newUserId = users.length + 1;
      const newUser = { id: newUserId, name: newUserName, email: newUserEmail, phone: newUserPhone, role: newUserRole };
      setUsers([...users, newUser]);
      handleCloseDialog();
      setActiveIcon(2); // Cambiar al ícono de usuarios registrados (índice 2)
    }
  };

  const menuItems = [
    { icon: <FaUserCircle />, id: 1, action: () => { setActiveIcon(1); setShowDialog(true); } },
    { icon: <FaUserAlt />, id: 2, action: () => setActiveIcon(2) },
    { icon: <FaCar />, id: 3 },
  ];

  const lastMenuItems = [
    { icon: <FaUserCog />, id: 4 },
    { icon: <FaSignOutAlt />, id: 5 },
  ];

  return (
    <>
      <menu className="menu">
        <img src={Dashboard1} alt="" />
        <ul id="mainMenu">
          {menuItems.map((item) => (
            <Icon
              key={item.id}
              icon={item.icon}
              isActive={activeIcon === item.id}
              onClick={item.action}
            />
          ))}
        </ul>

        <ul className="lastMenu">
          {lastMenuItems.map((item, index) => (
            <Icon
              key={item.id}
              icon={item.icon}
              isActive={activeIcon === index + 1}
              onClick={() => setActiveIcon(index + 1)}
            />
          ))}
        </ul>
      </menu>

      {showDialog && activeIcon === 1 && (
        <div className="dialog-container">
          <div className="dialog">
            <h2>Crear Usuario</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="tel"
              placeholder="Teléfono"
              value={newUserPhone}
              onChange={(e) => setNewUserPhone(e.target.value)}
            />
            {phoneError && <p className="error">{phoneError}</p>}
            <label>Rol:</label>
            <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleCreateUser}>Crear</button>
            <button onClick={() => { handleCloseDialog(); setActiveIcon(1); }}>Cancelar</button>
          </div>
        </div>
      )}

{activeIcon === 2 && (
  <div className="user-list">
    <h2>Usuarios Registrados</h2>
    <ul>
      {users.map((user) => (
         <li key={user.id} className="user-card">
         <p className="user-info">Nombre: {user.name}</p>
         <p className="user-info">Correo: {user.email}</p>
         <p className="user-info">Teléfono: {user.phone}</p>
         <p className="user-role">Rol: {user.role}</p>
       </li>
      ))}
    </ul>
  </div>
)}

    </>
  );
}

const Icon = ({ icon, isActive, onClick }) => (
  <li className={isActive ? 'active' : ''}>
    <a href="#" onClick={onClick}>
      {icon}
    </a>
  </li>
);

export default Menu;



//código con endpoint de prueba
/* import React, { useState, useEffect } from 'react';
import Dashboard1 from '../img/Dashboard1.jpg';
import './Menu.css';
import { FaUserCircle, FaUserAlt, FaCar, FaUserCog, FaSignOutAlt } from 'react-icons/fa';

function Menu() {
  const [activeIcon, setActiveIcon] = useState(null);
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://localhost:3001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9\s-]+$/.test(phone);
  };

  const changeActiveIcon = (index) => {
    if (index === 2 && (!validateEmail(newUserEmail) || !validatePhone(newUserPhone))) {
      return;
    }
    setActiveIcon(index);
  };

  const handleOpenDialog = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setEmailError('');
    setPhoneError('');
  };

  const handleCreateUser = async () => {
    if (newUserName && newUserEmail && newUserPhone) {
      if (!validateEmail(newUserEmail)) {
        setEmailError('Correo electrónico inválido');
        return;
      }
      if (!validatePhone(newUserPhone)) {
        setPhoneError('Teléfono inválido');
        return;
      }

      try {
        const response = await fetch('https://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newUserName,
            email: newUserEmail,
            phone: newUserPhone,
          }),
        });

        if (response.ok) {
          fetchUsers();
          handleCloseDialog();
          setActiveIcon(2);
        } else {
          console.error('Error creating user:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error('Error deleting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const menuItems = [
    { icon: <FaUserCircle />, id: 1, action: handleOpenDialog },
    { icon: <FaUserAlt />, id: 2, action: () => changeActiveIcon(2) },
    { icon: <FaCar />, id: 3 },
  ];

  const lastMenuItems = [
    { icon: <FaUserCog />, id: 4 },
    { icon: <FaSignOutAlt />, id: 5 },
  ];

  return (
    <>
      <menu className="menu">
        <img src={Dashboard1} alt="" />
        <ul id="mainMenu">
          {menuItems.map((item, index) => (
            <Icon
              key={item.id}
              icon={item.icon}
              isActive={activeIcon === index}
              onClick={item.action}
            />
          ))}
        </ul>

        <ul className="lastMenu">
          {lastMenuItems.map((item, index) => (
            <Icon
              key={item.id}
              icon={item.icon}
              isActive={activeIcon === index + menuItems.length}
              onClick={() => setActiveIcon(index + menuItems.length)}
            />
          ))}
        </ul>
      </menu>

      {showDialog && (
        <div className="dialog-container">
          <div className="dialog">
            <h2>Crear Usuario</h2>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
              type="tel"
              placeholder="Teléfono"
              value={newUserPhone}
              onChange={(e) => setNewUserPhone(e.target.value)}
            />
            {phoneError && <p className="error">{phoneError}</p>}
            <button onClick={handleCreateUser}>Crear</button>
            <button onClick={handleCloseDialog}>Cancelar</button>
          </div>
        </div>
      )}

      {activeIcon === 2 && (
        <div className="user-list">
          <h2>Usuarios Registrados</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Nombre: {user.name}</p>
                <p>Correo: {user.email}</p>
                <p>Teléfono: {user.phone}</p>
                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

const Icon = ({ icon, isActive, onClick }) => (
  <li className={isActive ? 'active' : ''}>
    <a href="#" onClick={onClick}>
      {icon}
    </a>
  </li>
);

export default Menu; */



//codigo primario
/* import React, {useEffect} from 'react'
import Dashboard1 from '../img/Dashboard1.jpg'
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