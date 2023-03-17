import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import styles from './card.module.css';

const Card = (props) => {
  const { id, categoria, nome, descricao, imagens } = props;

  const navigate = useNavigate();

  function navigateToDetails(id) {
    navigate(`/produtos/${id}`);
  }

  return (
    <div>
      <div key={id} className={styles.cardContainer}>
        <div className={styles.cardItem}>
          <h3 className={styles.subtitle}>{categoria.qualificacao}</h3>
          <h2 className={styles.title}>{nome}</h2>
          {imagens[0]?.url !== undefined ? (
            <div className={styles.image}>
              <img src={imagens[0]?.url} alt={imagens.titulo} />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.cardItem}>
          <p className={styles.description}>{descricao}</p>
        </div>
        <div className={`${styles.cardItem} ${styles.btn}`}>
          <button
            type="submit"
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
