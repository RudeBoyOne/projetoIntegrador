import styles from './horaReserva.module.css';
import React, { useState } from 'react';
import { BsCheck2Circle } from "react-icons/bs";

const HoraReserva = ({ selectedTime, onTimeChange }) => {
  
  

  return (
    <>
    <h2 className={styles.titleReservaHorario}>Seu horário de Retirada</h2>
    <div className={styles.horaMarcar}>

      <div className={styles.containerHoras}>
      <p className={styles.textReservaHorario}> <BsCheck2Circle className={styles.icon}/>Seu carro estará pronto para check-in entre 8h00 e 17h00</p>
      </div>

      <p className={styles.textReservaHorario}>Indique o horário previsto para retirar o veículo</p>

      <div >
      <select className={styles.selectHorario} value={selectedTime} onChange={onTimeChange}>

      <option value="">Selecione um horário</option>

      <option value="09:00">08:00</option>
      <option value="09:00">08:30</option>
      <option value="09:00">09:00</option>
      <option value="09:30">09:30</option>
      <option value="10:00">10:00</option>
      <option value="10:30">10:30</option>
      <option value="11:00">11:00</option>
      <option value="11:30">11:30</option>
      <option value="12:00">12:00</option>
      <option value="12:30">12:30</option>
      <option value="13:00">13:00</option>
      <option value="13:30">13:30</option>
      <option value="14:00">14:00</option>
      <option value="14:30">14:30</option>
      <option value="15:00">15:00</option>
      <option value="15:30">15:30</option>
      <option value="16:00">16:00</option>
      <option value="16:30">16:30</option>
    </select>
      </div>

    </div>
    </>
  )
}

export default HoraReserva;