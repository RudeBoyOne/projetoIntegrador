import { useNavigate } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import styles from './card.module.css';

const Card = ({ _id, category, name, image, description }) => {
  return (
    <>
      <div>
        <div key={_id} className={styles.card}>
          <h3 className={styles.subtitle}>{category}</h3>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.image}>
            <img src={image} alt={name} />
          </div>

          <p className={styles.description}>{description}</p>
          <div className={styles.btn}>
            <button className={styles.btnCard}>
              <FiArrowRight className={styles.btnCardIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
