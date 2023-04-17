import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import CardReserva from '../../components/card_reserva/cardReserva';
import Back_button from '../../components/back_button/back_button';

import { AuthContext } from '../../providers/AuthContext';
import api from '../../services/api';

import styles from './minhasReservas.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MinhasReservas = () => {
  const { userData } = useContext(AuthContext);
  const [infoReserva, setInfoReserva] = useState([]);

  async function getReservasById() {
    try {
      if (userData.token) {
        const response = await api.get(
          `/reservas/listarPorCliente/${userData.id}`
        );
        setInfoReserva(response.data);
      } else {
        toast.error('Você ainda não possui reservas.', {
          autoClose: 2500,
          position: 'top-center',
          theme: 'colored',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReservasById();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.minhasReservasContainer}>
        <div className={styles.minhasReservasContainerHeader}>
          <p className={styles.titleReservaDetail}>
            Reservas de {userData.nomeESobrenome}
          </p>
          <Back_button />
        </div>
        <div className={styles.bookingDetailInfo}>
          {infoReserva.lenght !== 0 ? (
            infoReserva
              .sort((a, b) => b.id - a.id)
              .map((reserva) => (
                <CardReserva
                  key={reserva?.id}
                  numReserva={reserva?.id}
                  nomeCarro={reserva?.produto.nome}
                  imagemCarro={reserva?.produto.imagens}
                  cidade={reserva?.produto.cidade.nome}
                  horaRetirada={reserva?.horaDeInicioDaReserva}
                  dataRetirada={reserva?.dataInicialDaReserva}
                  dataDevolucao={reserva?.dataFinalDaReserva}
                />
              ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default MinhasReservas;
