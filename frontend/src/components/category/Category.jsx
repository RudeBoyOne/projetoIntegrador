import styles from './category.module.css';

const CardCategory = (props) => {
  return (
    <div key={props.id} className={styles.categoryCard}>
      <h2 className={styles.categoryTitle}>{props.qualificacao}</h2>
      <div className={styles.categoryImageBox}>
        <img
          src={props.urlImagem}
          alt={props.qualificacao}
          className={styles.categoryImage}
        />
      </div>
      <p className={styles.categoryDescription}>{props.descricao}</p>
    </div>
  );
};

export default CardCategory;
