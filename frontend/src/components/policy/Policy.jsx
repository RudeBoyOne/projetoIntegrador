import React from 'react';
import styles from './policy.module.css';
import policyData from '../../utils/policyData.json';


function AppPolicy() {
  const { titulo, itens } = policyData.policy;

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>{titulo}</h2>
      <div className={styles.grid}>
        {itens.map((item) => (
          <div key={item.subtitulo} className={styles.item}>
            <h3 className={styles.subtitulo}>{item.subtitulo}</h3>
            <p className={styles.descricao}>{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppPolicy;