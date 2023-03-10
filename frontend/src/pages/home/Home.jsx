import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Category from '../../components/category/Category';
import Card from '../../components/card/Card';
<<<<<<< HEAD

import { category } from '../../utils/category.json';
=======
import { category } from '../../utils/cateogory.json';
>>>>>>> 0f1cd6c3c79ac6761efe9f91d5212a3aad7dbfac
import { carros } from '../../utils/carros.json';
import styles from './home.module.css';
import { FiArrowRight } from 'react-icons/fi';


function Home() {
  return (
    <div>
      <Header />
     
      <div className={styles.category}>
       
       
        <h3 className={styles.categoryTitle}><FiArrowRight className={styles.categoryTitleIcon} /> Pesquise por Categoria</h3>

        <div className={styles.categoryCard}>
          {category.map((category) => {
            return (
              <Category
                key={category._id}
                qualification={category.qualification}
                description={category.description}
                url={category.url}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}><FiArrowRight className={styles.categoryTitleIcon} /> Conheça a Nossa Frota</h3>
        <div className={styles.cards}>
          {carros.map((carro) => {
            return (
              <Card
                key={carro._id}
                category={carro.category}
                name={carro.name}
                image={carro.image}
                description={carro.description}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
