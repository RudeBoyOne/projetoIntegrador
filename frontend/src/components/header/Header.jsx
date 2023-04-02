import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthContext'; //exemplo //

import styles from './header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { userData, emptyUserData } = useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  function logout() {
    emptyUserData();
    toast.warn(
      'Você foi desconectado. Para fazer reservas você precisa efetuar o login novamente.',
      {
        autoClose: 3000,
        position: 'top-right',
        theme: 'colored',
      }
    );
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
                <p>CaranGo</p>
              </Link>
            </div>
            <div className={styles.navMenuList}>
              <ul className="">
                <li>
                  {userData.token ? (
                    <div className={styles.navName}>
                      <p>{`${userData?.nomeESobrenome
                        ?.split(' ')[0]
                        .charAt(0)}${userData?.nomeESobrenome
                        ?.split(' ')[1]
                        .charAt(0)}`}</p>
                      <p>
                        Olá,<br></br> {`${userData?.nomeESobrenome} `}
                      </p>
                    </div>
                  ) : (
                    <Link to="/Login" className={styles.loginLink}>
                      <p>Login</p>
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
        <ToastContainer />
      </div>
    </>
  );
};

export default Header;
