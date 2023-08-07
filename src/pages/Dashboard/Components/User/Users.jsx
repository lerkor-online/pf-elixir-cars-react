import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [newUserRole, setNewUserRole] = useState('user');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:3000/users');
        if (response.ok) {
          const data = await response.json();
          console.log('Users data:', data);
          setUsers(data);
        } else {
          console.error('Error fetching users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[0-9\s-]+$/.test(phone);
  };

  const handleCloseDialog = () => {
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserRole('user');
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
      const newUser = {
        id: newUserId,
        name: newUserName,
        email: newUserEmail,
        phone: newUserPhone,
        role: newUserRole,
      };
      setUsers([...users, newUser]);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <div>
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
        {emailError && <p>{emailError}</p>}
        <input
          type="tel"
          placeholder="Teléfono"
          value={newUserPhone}
          onChange={(e) => setNewUserPhone(e.target.value)}
        />
        {phoneError && <p>{phoneError}</p>}
        <label>Rol:</label>
        <select
          value={newUserRole}
          onChange={(e) => setNewUserRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleCreateUser}>Crear</button>
        <button onClick={handleCloseDialog}>Cancelar</button>
      </div>
    </div>
  );
};

export default Users;