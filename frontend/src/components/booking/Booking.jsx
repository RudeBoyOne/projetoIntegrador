import { useState, useContext } from 'react';
import styles from './booking.module.css';

import Calendar from '../calendar/calendar';

const Booking = ({ produtoSelecionado, bookingDetail }) => {
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());
  

  return (
    <div className={styles.booking}>
      <h2 className={styles.bookingTitle}>Datas para reserva</h2>
      <div className={styles.dataRent}>
        <Calendar onChange={setDate} value={date} />
       
      </div>
      <div className={styles.boxBooking}>
        <p>
          Adicione a data para reservar o seu carro e obter os preços exatos.
        </p>

        <button onClick={() => bookingDetail(produtoSelecionado)} className={styles.button}>
          Iniciar Reserva
        </button>

        {date.length > 0 ? (
          <p className={styles.textCenter}>
            <span className="bold">Retirada:</span> {date[0].toDateString()}
            <span className="bold">Entrega:</span> {date[1].toDateString()}
          </p>
        ) : (
          <p className={styles.textCenter}>
            <span className="bold">
              Selecione a data de retirada e entrega:
            </span>{' '}
            {date.toDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
