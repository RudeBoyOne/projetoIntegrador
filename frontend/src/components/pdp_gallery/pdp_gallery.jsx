import React, { useRef, useState, Component } from "react";
import Modal from "react-modal";
import Pdp_gallery_modal from "../pdp_gallery_modal/pdp_gallery_modal";
import styles from "./pdp_gallery.module.css";
Modal.setAppElement("#root");

function Pdp_gallery({ imagens }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function abrirModal() {
    $(".modal-content").addClass("show");
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={styles.pdp_gallery_c}>
      <div className={styles.pdp_gallery_grid}>

        { imagens != undefined ? imagens.map((imagem) => (
          <img 
            key={ imagem?.id }
            src={ imagem?.url }
            alt={ imagem?.titulo }
            className={styles.pdp_grid_img_1}
          />
        )) :
          <span>Carregando...</span> }

      </div>
      <div className={styles.btn_ver_mais_c}>
        <button className={styles.btn_ver_mais} onClick={openModal}>
          Ver mais
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overLayClassName={styles["modal-overlay"]}
        className={styles["modal-content"]}
        style={{ overlay: { zIndex: 99 } }}
      >
        <button className={styles.btn_fechar} onClick={closeModal}>
          X
        </button>

        <Pdp_gallery_modal />
      </Modal>
    </div>
  );
}
export default Pdp_gallery;
