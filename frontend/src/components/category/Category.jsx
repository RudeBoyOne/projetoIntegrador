import styles from './category.module.css';

const CardCategory = (props) => {
  const { id, qualificacao, urlImagem, descricao} = props;
  return (
    <div key={id} className={styles.categoryCard}>
      <h2 className={styles.categoryTitle}>{qualificacao}</h2>
      <div className={styles.categoryImageBox}>
        <img
          src={urlImagem}
          alt={qualificacao}
          className={styles.categoryImage}
        />
      </div>
      <p className={styles.categoryDescription}>{descricao}</p>
    </div>
  );
};

export default CardCategory;
