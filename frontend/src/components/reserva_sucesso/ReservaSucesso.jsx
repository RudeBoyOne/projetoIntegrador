import React from 'react';
import ReactModal from 'react-modal';
import check from '../../images/checking.png';

import styles from './reservaSucesso.module.css';

function ReservaSucesso(props) {
  return (
    <ReactModal
      isOpen={props.showModal}
      onRequestClose={props.onCloseModal}
      contentLabel="Example Modal"
      className={styles.reservaModal}
    >
      <img src={check} alt="icone de sucesso" />
      <h1>Status da Reserva</h1>
      <h3>Sua reserva foi realizada!</h3>
      <button onClick={props.onCloseModal}>Fechar</button>
    </ReactModal>
  );
}

export default ReservaSucesso;
