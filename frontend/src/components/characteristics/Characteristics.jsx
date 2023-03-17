import React from 'react';
import styles from './characteristics.module.css';


function Characteristics({caracteristicas}) {
 
  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Caracteristicas</h2>
      <div className={styles.grid}>

      { caracteristicas != undefined ? 
            caracteristicas.map((caracteristica) => (
              <div key={caracteristica?.id} className={styles.item}>
                <img src={caracteristica?.icone} className={styles.icone}></img>
                <p className={styles.atributo}>{caracteristica?.nome}</p>
              </div>
            )) : 
            <span>Carregando...</span> }
      </div>
    </div>
  );
}

export default Characteristics;
