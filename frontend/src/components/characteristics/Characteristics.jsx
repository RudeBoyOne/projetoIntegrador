
import React, { useState, useEffect } from 'react';
import styles from './characteristics.module.css';

function Characteristics() {
  const [caracteristicas, setCaracteristicas] = useState([]);

  useEffect(() => {
    async function fetchCaracteristicas() {
      try {
        const response = await fetch('/caracteristicas');
        const data = await response.json();
        setCaracteristicas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCaracteristicas();
  }, []);

  const colunas = [[], [], [], []];

  caracteristicas.forEach((caracteristica, index) => {
    colunas[index % 4].push(caracteristica);
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Caracteristicas</h2>
      <div className={styles.grid}>
        {colunas.map((coluna, index) => (
          <div key={index} className={styles.coluna}>
            {coluna.map(caracteristica => (
              <div key={caracteristica.id} className={styles.item}>
                <i className={caracteristica.icon}></i>
                <p className={styles.atributo}>{caracteristica.nome}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;
