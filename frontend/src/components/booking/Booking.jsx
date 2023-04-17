import { useState, useContext } from 'react';
import styles from './booking.module.css';
import { CidadeContext } from '../../providers/CidadeContext';

import Calendar from '../calendar/calendar';

const Booking = ({ produtoSelecionado, bookingDetail }) => {
  const { cidadeSelecionada } = useContext(CidadeContext);
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className={styles.bookingTitleContainer}>
        <h2 className={styles.bookingTitle}>Reserve este veículo</h2>
        <p>Clique no botão abaixo para iniciar a sua reserva.</p>
      </div>
      <div className={styles.booking}>
        <div className={styles.boxBooking}>
         
          <div className={styles.textBoxBoking}>
            <p>Agência escolhida:</p>
            <p>{cidadeSelecionada.nome}</p>
          </div>
          <button
            onClick={() => bookingDetail(produtoSelecionado)}
            className={styles.bookingButton}
          >
            Iniciar Reserva
          </button>

          <p>
            <small>
              Ao clicar no botão Iniciar Reserva, você será direcionado para a
              página de reservas.
            </small>
          </p>
        </div>
      </div>
    </>
  );
};

export default Booking;
