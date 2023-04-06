import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './modal.module.css';

import { FiCheckCircle } from 'react-icons/fi';
Modal.setAppElement('#root');

function ModalCadastroProduto() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Cadastro Finalizado"
  className={styles.modal}
>
  <div className={styles.modalContent}>
    <h2>Cadastro realizado com sucesso!</h2>
    <FiCheckCircle className={styles.successIcon} size={64} color="#32CD32" />
    <p>Seu produto foi adicionado com sucesso.</p>
    
    <button onClick={closeModal}>Fechar</button>
  </div>
</Modal>
     
    </div>
  );
}

export default ModalCadastroProduto;