import React from 'react';
import styles from './pdp_local.module.css';

export default function Pdp_local() {
  return (
    <div className={styles.pdp_local_c}>
        <div className={styles.pdp_local_left} >
            <span className={styles.pdp_local_cidade}>Cidade</span>
            <span className={styles.pdp_local_pais}>País</span>
        </div>       
    </div>
  )
}