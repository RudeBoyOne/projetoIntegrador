import CardCategory from './Category';
import styles from './category.module.css';

const CategorieList = ({ categorias, categoriaSelecionada, setCategoriaSelecionada }) => {
  console.log(categorias);

  const handleClickCategoria = (categoriaId) => {
    setCategoriaSelecionada(categoriaId);
  };
  
 
  return (
    <div className={styles.categoryList}>
      {categorias.map((categoria) => (
        <CardCategory
          key={categoria?.id}
          id={categoria?.id}
          qualificacao={categoria?.qualificacao}
          descricao={categoria?.descricao}
          urlImagem={categoria?.urlImagem}
          className={styles.categoryCard}
          onClick={() => handleClickCategoria(categoria?.id)}
        />
      ))}
    </div>
  );
};

export default CategorieList;
