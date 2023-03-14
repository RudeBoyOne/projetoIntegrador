import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import styles from './card.module.css';

const Card = (props) => {
  
  return (
    <div>
      <div key={props.id} className={styles.cardContainer}>
        <div className={styles.cardItem}>
          <h3 className={styles.subtitle}>{props.categoria}</h3>
          <h2 className={styles.title}>{props.nome}</h2>
          <div className={styles.image}>
            <img src={props.imagens} alt={props.nome} />
          </div>
        </div>
        <div className={styles.cardItem}>
          <p className={styles.description}>{props.descricao}</p>
        </div>
        <div className={`${styles.cardItem} ${styles.btn}`}>
          <Link to={`/produtos/${props.id}`} className={styles.btnCard}>
            <FiArrowRight className={styles.btnCardIcon} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
