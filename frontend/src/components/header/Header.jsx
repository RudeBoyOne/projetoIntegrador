import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../images/Carango-logo-h.png';
import { AuthContext } from '../../providers/AuthContext'; //exemplo //

import styles from './header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineCar } from 'react-icons/ai';
import { IoTicketOutline } from 'react-icons/io5';
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
        <div className={styles.headerContainer}>
          <Link to="/">
            <img src={logo} alt="Carango" className={styles.logo} />
          </Link>

          <nav className={isActive ? 'navMenu showMenu' : 'navMenu'}>
            <FaTimes
              className="navClose"
              onClick={() => setIsActive(!isActive)}
            />
            <div className={styles.navContainer}>
              <div className={styles.headerLogo}></div>
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
                              <Link to="/meuperfil" className={styles.menuLink}>
                                <FiUser className={styles.menuIcon} />
                                Meu Perfil
                              </Link>
                            </li>
                            {userData.roles &&
                            userData.roles.some(
                              (role) => role.nome === 'ADMIN'
                            ) ? (
                              <>
                                <li>
                                  <Link
                                    to="/criarproduto"
                                    className={styles.menuLink}
                                  >
                                    <AiOutlineCar className={styles.menuIcon} />
                                    Incluir Veículo
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/dashboard"
                                    className={styles.menuLink}
                                  >
                                    <FiPieChart className={styles.menuIcon} />
                                    Dashboard
                                  </Link>
                                </li>
                              </>
                            ) : (
                              <>
                                <li>
                                  <Link
                                    to="/minhasreservas"
                                    className={styles.menuLink}
                                  >
                                    <IoTicketOutline
                                      className={styles.menuIcon}
                                    />
                                    Minhas Reservas
                                  </Link>
                                </li>
                              </>
                            )}
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
                        <Link
                          to="/criarconta"
                          className={styles.navLink_button}
                        >
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
      </div>
    </>
  );
};

export default Header;
