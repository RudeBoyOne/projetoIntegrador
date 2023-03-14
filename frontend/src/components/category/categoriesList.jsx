import CardCategory from './Category';
import styles from './category.module.css';

const CategorieList = ({ categorias, filtroPorCategorias, handleCategoriaSelecionada }) => {
  console.log(categorias);
  return (
    <div className={styles.categoryList}>
      {categorias.map((categoria) => (
        <CardCategory
          key={categoria.id}
          qualificacao={categoria.qualificacao}
          descricao={categoria.descricao}
          urlImagem={categoria.urlImagem}
          className={styles.categoryCard}
          onClick={() => handleCategoriaSelecionada(categoria.id)}
        />
      ))}
    </div>
  );
};

export default CategorieList;
