import React, { useRef, useState, Component } from "react";
import Modal from "react-modal";
import Pdp_gallery_modal from "../pdp_gallery_modal/pdp_gallery_modal";
import styles from "./pdp_gallery.module.css";
Modal.setAppElement("#root");
function Pdp_gallery() {
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
        <img
          src="https://i.postimg.cc/J4VTsPsg/208-01.jpg"
          alt=""
          className={styles.pdp_grid_img_1}
        />
        <img
          src="https://i.postimg.cc/fW02W6Rm/208-02.jpg"
          alt=""
          className={styles.pdp_grid_img_2}
        />
        <img
          src="https://i.postimg.cc/3NpnLDcn/208-03.jpg"
          alt=""
          className={styles.pdp_grid_img_3}
        />
        <img
          src="https://i.postimg.cc/YCtb30fz/208-04.jpg"
          alt=""
          className={styles.pdp_grid_img_4}
        />
        <img
          src="https://i.postimg.cc/5NBsLLvt/208-05.jpg"
          alt=""
          className={styles.pdp_grid_img_5}
        />
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
