import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthContext'; //exemplo //

import styles from './header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { userData, emptyUserData } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  function logout() {
    emptyUserData();
    navigate('/');
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
                  {userData.token ? (
                    <div className={styles.navName}>
                      <p>Olá,  {`${userData?.nomeESobrenome} `}</p>
                      <p>{`${userData?.nomeESobrenome
                        ?.split(' ')[0]
                        .charAt(0)}${userData?.nomeESobrenome
                        ?.split(' ')[1]
                        .charAt(0)}`}</p>
                    </div>
                  ) : (
                    <Link to="/Login" className={styles.loginLink}>
                      <p>
                       Login
                      </p>
                    </Link>
                  )}
                </li>
                <li className={styles.navItem_button}>
                  <>
                    {!userData.token ? (
                      <Link to="/criarconta" className={styles.navLink_button}>
                        Criar conta
                      </Link>
                    ) : (
                      <button
                        onClick={() => logout()}
                        className={styles.navLink_button}
                      >
                        <FiLogOut /> Sair
                      </button>
                    )}
                  </>
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
