import { useNavigate, Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import styles from './card.module.css';

const Card = ({ _id, category, name, image, description }) => {
  return (
    <>
      <div key={_id} className={styles.cardContainer}>
        <div className={styles.cardItem}>
          <h3 className={styles.subtitle}>{category}</h3>
          <h2 className={styles.title}>{name}</h2>
          <div className={styles.image}>
            <img src={image} alt={name} />
          </div>
        </div>
        <div className={styles.cardItem}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={`${styles.cardItem} ${styles.btn}`}>
          <Link to={`/product/${_id}`} className={styles.btnCard}>
            <FiArrowRight className={styles.btnCardIcon} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
