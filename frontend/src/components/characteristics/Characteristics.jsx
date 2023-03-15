import React, { useState, useEffect } from 'react';
import styles from './characteristics.module.css';

import api from '../../services/api';

function Characteristics({caracteristicas}) {
  console.log(caracteristicas);
 
  const colunas = [[], [], [], []];

  // caracteristicas.forEach((caracteristica, index) => {
  //   colunas[index % 4].push(caracteristica);
  // });

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Caracteristicas</h2>
      <div className={styles.grid}>

      {/* {caracteristicas.map((caracteristica) => (
              <div key={caracteristica?.id} className={styles.item}>
                <img src={caracteristica?.icone} className={styles.icone}></img>
                <p className={styles.atributo}>{caracteristica?.nome}</p>
              </div>
            ))} */}
        {/* {colunas.map((coluna, index) => (
          <div key={index} className={styles.coluna}>
            
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default Characteristics;
