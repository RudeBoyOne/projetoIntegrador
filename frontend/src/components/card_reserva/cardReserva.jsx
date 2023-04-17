import React from 'react';

import styles from './cardReserva.module.css';

const CardReserva = ({
  numReserva,
  nomeCarro,
  imagemCarro,
  cidade,
  horaRetirada,
  dataRetirada,
  dataDevolucao,
}) => {
  return (
    <div>
      <div className={styles.cardReservaContainer}>
        <div className={styles.cardReservaContainerTitle}>
          <p>Reserva nº:</p>
          <p>{numReserva}</p>
        </div>
        <div className={styles.cardReservaContainerCarro}>
          <p>{nomeCarro}</p>
          <img src={imagemCarro[0]?.url} alt={imagemCarro.titulo} />
        </div>
        <div className={styles.cardReservaContainerData}>
          <p>Cidade:</p>
          <p>{cidade}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardReservaContainerData}>
          <p>Hora: </p>
          <p>{horaRetirada}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardReservaContainerData}>
          <p>Retirada:</p>
          <p>{dataRetirada}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.cardReservaContainerData}>
          <p>Devolução:</p>
          <p>{dataDevolucao}</p>
        </div>
        
      </div>
    </div>
  );
};

export default CardReserva;
