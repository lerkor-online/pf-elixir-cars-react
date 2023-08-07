import React from 'react'
import style from  './Dashboard.module.css'
import Container from '../../components/Container/Container.jsx';
import Menu from '../Dashboard/Components/Menu/Menu.jsx';

function Dashboard() {
  return (
  <div className={style.container}>
    <Container />
    <Menu />
  </div>
  );
  
}

export default Dashboard;