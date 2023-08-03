import React from 'react'
import style from  './Dashboard.module.css'
/* import Container from '../Container/Container.jsx'; */
import Menu from '../Menu/Menu';
import NavDash from '../NavDash/NavDash'

function Dashboard() {
  return (
  <div className={style.container}>
   {/*  <Container /> */}
    <Menu />
    <NavDash/>
  </div>
  );
  
}

export default Dashboard;