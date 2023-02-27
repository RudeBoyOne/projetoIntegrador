import Header from '../../components/header/Header';
import Card from '../../components/card/Card';
import styles from './home.module.css';
import { carros } from '../../utils/carros.json';

const Home = () => {
  return (
    <div>
      <Header />
      <div className={styles.cardContainer}>
        <h2 className={styles.cardTitle}>Nossa Frota</h2>
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
    </div>
  );
};

export default Home;
