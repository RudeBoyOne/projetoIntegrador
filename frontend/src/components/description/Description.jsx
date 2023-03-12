import React from 'react';
import styles from "./description.module.css";
import descriptionData from '../../utils/descriptionData.json';


function Description() {
  const { description } = descriptionData;

  return (
    <div className={styles.container}>
      {description.map((item) => (
        <div key={item.id}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.description}>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Description;