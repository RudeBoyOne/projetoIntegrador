import React, {useState, useContext} from 'react';

import Header from '../../components/header/Header';

import { IoCarSportOutline,IoMapOutline, IoPeopleOutline, IoReaderOutline, IoTicketOutline  } from "react-icons/io5";
import styles from './dashboard.module.css';


const Dashboard = () => {
    
  return (
    <div>
        <Header />
        <div className={styles.dashNavigation}>
            <ul className={styles.dashNavList}>
                <li className={styles.dashNavItem}><IoCarSportOutline className={styles.dashIcon} />Produtos</li>
                <li className={styles.dashNavItem}><IoMapOutline className={styles.dashIcon} />Cidades</li>
                <li className={styles.dashNavItem}><IoPeopleOutline className={styles.dashIcon} />Users</li>
                <li className={styles.dashNavItem}><IoReaderOutline className={styles.dashIcon} />Características</li>
                <li className={styles.dashNavItem}><IoTicketOutline className={styles.dashIcon} />Reservas</li>
            </ul>
        </div>
    </div>
  )
}

export default Dashboard;