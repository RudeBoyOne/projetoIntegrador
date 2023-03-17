import React from 'react';
import styles from "./description.module.css";
import descriptionData from '../../utils/descriptionData.json';


function Description({ nomeCarro, descricao }) {
  const { description } = descriptionData;

  return (
    <div className={styles.container}>
          <h2 className={styles.title}>{ nomeCarro }</h2>
          <p className={styles.description}>{ descricao }</p>
    </div>
  );
}

export default Description;