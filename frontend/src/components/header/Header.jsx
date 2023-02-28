import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import SearchBar from '../search/Search';

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <nav className={styles.navHeader}>
          <a href="#" className={styles.navLogo}>
            Laje Dev
          </a>
          <div className={styles.navMenu}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <a className={styles.navLink} href="#">
                  Login
                </a>
              </li>
              <li className={styles.navItem_button}>
                <a className={styles.navLink_button} href="#">
                  Cadastrar
                </a>
              </li>
              <li className="toggle">
                {' '}
                <a href="#">
                  <span className="bars"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
        <div className={styles.navSearch}>
          <SearchBar />
        </div>
    </>
  );
};

export default Header;