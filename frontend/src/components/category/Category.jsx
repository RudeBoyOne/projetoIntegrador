import styles from './category.module.css';

const CardCategory = ({ categorias, filtroPorCategoria }) => {
  return (
    <div className={styles.categoryList}>
      {categorias !== undefined
        ? categorias.map((categoria) => {
            return (
              <div
                key={categoria?.id}
                onClick={() => filtroPorCategoria(categoria?.id)}
                className={styles.categoryCard}
              >
                <h2 className={styles.categoryTitle}>
                  {categoria?.qualificacao}
                </h2>
                <div className={styles.categoryImageBox}>
                  <img
                    src={categoria?.urlImagem}
                    alt={categoria?.qualificacao}
                    className={styles.categoryImage}
                  />
                </div>
                <p className={styles.categoryDescription}>
                  {categoria?.descricao}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default CardCategory;
