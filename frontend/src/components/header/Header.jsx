import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../images/CaranGo-logo-h.png';
import { AuthContext } from '../../providers/AuthContext'; //exemplo //

import styles from './header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineCar } from 'react-icons/ai';
import { FiLogIn, FiLogOut, FiUser, FiPieChart } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { userData, emptyUserData, isLogin, setIsLoggin } =
    useContext(AuthContext);
  const [isActive, setIsActive] = useState(false);
  const [showMenuProfile, setShowMenuProfile] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenuProfile(!showMenuProfile);
  };

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

  const incluirVeiculo = () => {
    if (userData.token) {
      navigate('/criarproduto');
    }
  };

  const navDashboard = () => {
    if (userData.token) {
      navigate('/dashboard');
    }
  };

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
              <Link to="/">
                {/* <p>CaranGo</p> */}
                <img src={logo} alt="Carango" className={styles.logo} />
              </Link>
            </div>
            <div className={styles.navMenuList}>
              <ul className="">
                <li>
                  {userData.token ? (
                    <div
                      className={`${styles.navName} ${styles.avatarDropdown}`}
                    >
                      <div className={styles.avatar} onClick={toggleMenu}>
                        <p>{`${userData?.nomeESobrenome
                          ?.split(' ')[0]
                          .charAt(0)}${userData?.nomeESobrenome
                          ?.split(' ')[1]
                          .charAt(0)}`}</p>
                      </div>
                      {isLogin && showMenuProfile && (
                        <ul className={styles.dropdownMenu}>
                          <li>
                            <FiUser className={styles.menuIcon} />
                            Meu Perfil
                          </li>
                          <li onClick={() => incluirVeiculo()}>
                            <AiOutlineCar className={styles.menuIcon} />
                            Incluir Veículo
                          </li>
                          <li onClick={() => navDashboard()}>
                            <FiPieChart className={styles.menuIcon} />
                            Dashboard
                          </li>
                        </ul>
                      )}
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
