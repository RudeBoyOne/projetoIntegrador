import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../search/Search';

import api from '../../services/api';

import styles from './header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ cidadeSelecionada }) => {
 

  const [isActive, setIsActive] = useState(false);

  

  const handleCidadeChange = (event) => {
    setCidadeSelecionada(event.target.value);
  };

  function getFilteredList() {
    if (!cidadeSelecionada) {
      return cidades;
    }
    return cidades.filter((item) => item.categoria);
  }

  return (
    <>
      <div className={styles.header}>
        <nav className={isActive ? 'navMenu showMenu' : 'navMenu'}>
          <FaTimes
            className="navClose"
            onClick={() => setIsActive(!isActive)}
          />
          <div className={styles.navContainer}>
            <div className={styles.headerLogo}>
              <Link to="/" className={styles.logo}>
                <p>Laje Dev</p>
              </Link>
            </div>
            <div className={styles.navMenuList}>
              <ul className="">
                <li>
                  <Link to="/Login" className={styles.loginLink}>
                    <p>Login</p>
                  </Link>
                </li>
                <li className={styles.navItem_button}>
                  <Link to="/Register" className={styles.navLink_button}>
                    Criar conta
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
        </nav>
        <div className="btnToggle" onClick={() => setIsActive(!isActive)}>
          <FaBars />
        </div>
      </div>
    </>
  );
};

export default Header;
