import React from "react";
import { Link } from 'react-router-dom';
import styles from './header.module.css';


const Header = () => {

  return (

    <div className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src="img" alt="" />
          <span>LOGO</span>
        </Link>
        <div className={styles.navMenu}>
          <ul className={styles.navList}>
            <li><Link to="/Login" >Login</Link></li>
            <li className={styles.navItem_button}>
              <Link to="/Register" className={styles.navLink_button}>Criar conta</Link>
            </li>
            <li className="toggle"> <a href="#"><span className="bars"></span></a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
