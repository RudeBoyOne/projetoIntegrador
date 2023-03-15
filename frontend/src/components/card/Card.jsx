import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import styles from './card.module.css';

const Card = (props) => {
  const { id, qualificacao, nome, descricao, urlImagem } = props;
  console.log(id);
  const navigate = useNavigate();

  function navigateToDetails(id) {
    navigate(`/produtos/${id}`);
  }

  useEffect(() => {
    console.log(props.id);
  }, []);

  return (
    <div>
      <div key={id} className={styles.cardContainer}>
        <div className={styles.cardItem}>
          <h3 className={styles.subtitle}>{qualificacao}</h3>
          <h2 className={styles.title}>{nome}</h2>
          <div className={styles.image}>
            <img src={urlImagem} alt={nome} />
          </div>
        </div>
        <div className={styles.cardItem}>
          <p className={styles.description}>{descricao}</p>
        </div>
        <div className={`${styles.cardItem} ${styles.btn}`}>
          <button
            onClick={() => navigateToDetails(id)}
            className={styles.btnCard}
          >
            <FiArrowRight className={styles.btnCardIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
