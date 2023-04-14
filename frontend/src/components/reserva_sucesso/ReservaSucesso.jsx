import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactModal from 'react-modal';
import check from '../../images/checking.png';

import styles from './reservaSucesso.module.css';

function ReservaSucesso(props) {
  

  return (
    // <Modal show={showModal} onHide={handleClose}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Reserva Bem-sucedida</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>Sua reserva foi bem-sucedida!</Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={handleClose}>
    //       Fechar
    //     </Button>
    //   </Modal.Footer>
    // </Modal>
    <ReactModal 
    isOpen={props.showModal}
    onRequestClose={props.onCloseModal}
    contentLabel='Example Modal'
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


