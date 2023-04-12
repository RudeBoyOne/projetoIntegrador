import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import styles from './dashboardScreens.module.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  async function getReservas() {
    try {
      const response = await api.get('/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getReservas();
  }, []);

  return (
    <div className={styles.dashScreens}>
      <div className={styles.dashContainerTitle}>
        <p>Reservas</p>
      </div>
      <div>
        <table id="reservas" className={styles.reservaTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Veículo</th>
              <th>Hora de retirada</th>
              <th>Data de retirada</th>
              <th>Data de devolução</th>
            </tr>
            {reservas !== ''
              ? reservas.map((reserva) => (
                  <>
                    <tr className={styles.reservaDataTable}>
                      <td>{reserva.usuario.nome}</td>
                      <td>{reserva.usuario.sobrenome}</td>
                      <td>{reserva.produto.nome}</td>
                      <td>{reserva.horaDeInicioDaReserva}</td>
                      <td>{reserva.dataInicialDaReserva}</td>
                      <td>{reserva.dataFinalDaReserva}</td>
                    </tr>
                  </>
                ))
              : null}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Reservas;
