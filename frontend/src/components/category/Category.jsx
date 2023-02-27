import styles from './category.module.css';

const Category = ({ _id, qualification, description, url }) => {
  return (
    <div className={styles.categoryCard}>
      <h2 className={styles.categoryTitle}>{qualification}</h2>
      <div className={styles.categoryImageBox}>
        <img src={url} alt={qualification} className={styles.categoryImage} />
      </div>
      <p className={styles.categoryDescription}>{description}</p>
    </div>
  );
};

export default Category;
