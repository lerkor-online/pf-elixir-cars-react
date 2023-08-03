import React from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';
import { BsPerson } from 'react-icons/bs';
import { BsWallet2 } from 'react-icons/bs';
import { CiHeadphones } from 'react-icons/ci';
import { BsBook } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import './NavDash.css';

const Index = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <div className="icon">
            <HiMenuAlt1 />
          </div>
            <div className="logo-text">
                <img src="./img/logo.png" width={200} height={200} alt="Nuestro logo" />
            </div>
        </div>
        <div className="user-actions">
          <div className="user-badge">Los lobos de JavaScript</div>
          <div className="action-badge blue-gradient">
            <BsPerson />
          </div>
          <div className="action-badge blue-gradient">
            <BsWallet2 />
          </div>
          <div className="action-badge purple-gradient">
            <CiHeadphones />
          </div>
          <div className="action-badge purple-gradient">
            <BsBook />
          </div>
          <div className="action-badge red-gradient">
            <IoMdNotificationsOutline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
