import { useState } from 'react';

import BlocoReservas from '../../components/bloco_reserva/BlocoReservas';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import AppPolicy from '../../components/policy/Policy';
import HoraReserva from '../../components/hora_reserva/HoraReserva';
import Calendar from '../../components/calendar/calendar';
import FormularioReserva from '../../components/formulario_reserva/FormularioReserva';
import styles from './reserva.module.css';

import api from '../../services/api';

import { ProductContext } from '../../providers/ProductContext';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';

const Reservas = () => {
  const { detalheProduto } = useContext(ProductContext);


  return (
    <>
      <Header />
      <div className={styles.containerReserva}>
        <div className={styles.bloco}>
          <BlocoReservas detalheProduto={detalheProduto} />
        </div>

        <div className={styles.formulario}>
          <FormularioReserva />
        </div>

        <div className={styles.calendar}>
          <h2>Selecione o perÃ­odo</h2>
          <Calendar />
        </div>

        <div className={styles.horas}>
          <HoraReserva />
        </div>
      </div>

      <AppPolicy />
      <Footer />
    </>
  );
};

export default Reservas;