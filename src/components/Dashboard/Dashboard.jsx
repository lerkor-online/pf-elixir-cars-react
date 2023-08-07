import React from 'react'
import style from  './Dashboard.module.css'
import Container from '../Container/Container.jsx';
import Menu from '../Menu/Menu';

function Dashboard() {
  return (
  <div className={style.container}>
    <Container />
    <Menu />
  </div>
  );
  
}

export default Dashboard;