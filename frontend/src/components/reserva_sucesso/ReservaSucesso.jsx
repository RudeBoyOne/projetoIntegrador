import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function ReservaSucesso(props) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reserva Bem-sucedida</Modal.Title>
      </Modal.Header>
      <Modal.Body>Sua reserva foi bem-sucedida!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReservaSucesso;


