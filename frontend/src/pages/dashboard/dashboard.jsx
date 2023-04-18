import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Frota from '../../components/dashboard_screens/frota';
import Users from '../../components/dashboard_screens/users';
import Caracteristicas from '../../components/dashboard_screens/caracteristicas';
import Cidades from '../../components/dashboard_screens/cidades';
import Reservas from '../../components/dashboard_screens/reservas';

import {
  IoCarSportOutline,
  IoMapOutline,
  IoPeopleOutline,
  IoReaderOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import styles from './dashboard.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const [screens, setScreens] = useState({
    caracteristicas: false,
    cidades: false,
    frota: false,
    reservas: true,
    usuarios: false,
  });

  function toggleBtnScreen(button) {
    setScreens({
      ...screens,
      cards: false,
      caracteristicas: false,
      cidades: false,
      frota: false,
      reservas: false,
      usuarios: false,
      [button]: true,
    });
  }

  return (
    <div className={styles.dashBody}>
      <Header />
      <div className={styles.dashContainer}>
        <div className={styles.dashNavigation}>
          <ul className={styles.dashNavList}>
            <li>
              <button
                className={styles.dashNavItem}
                onClick={() => toggleBtnScreen('caracteristicas')}
              >
                {screens.caracteristicas ? (
                  <>
                    <IoReaderOutline className={styles.dashIcon} />
                    Características
                  </>
                ) : (
                  <>
                    <IoReaderOutline className={styles.dashIcon} />
                    Características
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={styles.dashNavItem}
                onClick={() => toggleBtnScreen('cidades')}
              >
                {screens.cidades ? (
                  <>
                    <IoMapOutline className={styles.dashIcon} />
                    Cidades
                  </>
                ) : (
                  <>
                    <IoMapOutline className={styles.dashIcon} />
                    Cidades
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={styles.dashNavItem}
                onClick={() => toggleBtnScreen('frota')}
              >
                {screens.frota ? (
                  <>
                    <IoCarSportOutline className={styles.dashIcon} />
                    Frota
                  </>
                ) : (
                  <>
                    <IoCarSportOutline className={styles.dashIcon} />
                    Frota
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={styles.dashNavItem}
                onClick={() => toggleBtnScreen('reservas')}
              >
                {screens.reservas ? (
                  <>
                    <IoTicketOutline className={styles.dashIcon} />
                    Reservas
                  </>
                ) : (
                  <>
                    <IoTicketOutline className={styles.dashIcon} />
                    Reservas
                  </>
                )}
              </button>
            </li>
            <li>
              <button
                className={styles.dashNavItem}
                onClick={() => toggleBtnScreen('usuarios')}
              >
                {screens.usuarios ? (
                  <>
                    <IoPeopleOutline className={styles.dashIcon} />
                    Usuários
                  </>
                ) : (
                  <>
                    <IoPeopleOutline className={styles.dashIcon} />
                    Usuários
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className={styles.dashCards}>
          {screens.caracteristicas && <Caracteristicas/>}
          {screens.cidades && <Cidades/>}
          {screens.frota && <Frota/>}
          {screens.reservas && <Reservas />}
          {screens.usuarios && <Users />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
