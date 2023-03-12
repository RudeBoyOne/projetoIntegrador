import { useState } from 'react';
import styles from './booking.module.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Booking = () => {
  const [value, onChange] = useState(new Date());
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.booking}>
      <h1>Datas para reserva</h1>
      <div className={styles.dataRent}>
        <Calendar className={styles.calendarRent} onChange={setDate} value={date} selectRange={true}/>
        <Calendar className={styles.calendarBack} onChange={setDate} value={date} />
      </div>
      <div className={styles.boxBooking}>
        
        <p>Adicione a data para reservar o seu carro e obter os preços exatos.</p>

        <button className={styles.button}>Iniciar reserva</button>
        
        {date.length > 0 ? (
        <p className={styles.textCenter}>
          <span className='bold'>Retirada:</span>{' '}
          {date[0].toDateString()}
          <span className='bold'>Entrega:</span> {date[1].toDateString()}
        </p>
      ) : (
        <p className={styles.textCenter}>
          <span className='bold'>Selecione a data de retirada e entrega:</span>{' '}
          {date.toDateString()}
        </p>
      )}
      </div>
      
    </div>
  );

}

export default Booking;