import { useState } from 'react';
import styles from './booking.module.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Booking = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.booking}>
      <h1>Datas para reserva</h1>
      <div className={styles.dataRent}>
        <Calendar onChange={onChange} value={value} />
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className={styles.boxBooking}>
        
        <p>Adicione as data para reservar o seu carro e obter os preços exatos</p>
        <button className={styles.button}>Iniciar reserva</button>

      </div>
    </div>
  );

}

export default Booking;