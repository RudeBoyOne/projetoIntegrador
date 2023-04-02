import React from 'react';
import Back_button from '../back_button/back_button';
import styles from './pdp_header.module.css';

export default function Pdp_header({ titulo, categoria }) {
  return (
    <div className={styles.pdp_header_c}>
      <div className={styles.pdp_header_left}>
        <span className={styles.pdp_header_title}>{titulo}</span>
        <span className={styles.pdp_header_category}>Categoria: <b>{categoria?.qualificacao}</b></span>
      </div>
      <div className={styles.pdp_header_right}>
        <Back_button />
      </div>
    </div>
  );
}
