import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/Search';

import CategorieList from '../../components/category/categoriesList';
import Card from '../../components/card/Card';
import CarrosList from '../../components/card/CarrosList';

import api from '../../services/api';
import styles from './home.module.css';
import { FiArrowRight } from 'react-icons/fi';

function Home() {
  const [cidades, setCidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carros, setCarros] = useState([]);
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  useEffect(() => {
    getCidades();
    getCarros();
    getCategorias();
  }, []);

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCarros() {
    try {
      const response = await api.get('/produtos');
      setCarros(response.data);
      setCarrosFiltrados(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategorias() {
    try {
      const response = await api.get('/categorias');
      setCategorias(response.data);
      setCategoriaSelecionada(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function filtroPorCidades(id) {
    try {
      if (id) {
        const response = await api.get(
          `/produtos/listarPorCidade?cidade=${id}`
        );
        setCarrosFiltrados(response.data);
        console.log(response.data);
      } else {
        setCarrosFiltrados(carros);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const filter = (button) => {
    const filteredData = categorias.filter((item) => item.categoria === button);
    setCategorias(filteredData);
  };

  // const filteredCarros = carrosFiltrados
  //   ? carros.filter(
  //       (product) => product.categoria === carrosFiltrados.categoria
  //     )
  //   : carros;

  return (
    <div>
      <Header />
      <div className="navSearch">
        <SearchBar cidades={cidades} filtroPorCidades={filtroPorCidades} />
      </div>

      <div className={styles.category}>
        <h3>
          <Link to="/categorias" className={styles.categoryTitle}>
            <FiArrowRight className={styles.categoryTitleIcon} /> Pesquise por
            Categoria
          </Link>
        </h3>

        <CategorieList
          categorias={categorias}

          // filtroPorCategorias={filtroPorCategorias}
        />
        <div className={styles.categoryCard}></div>
      </div>

      <div className={styles.cardContainer}>
        <CarrosList categoria={categoriaSelecionada} />
        <h3 className={styles.cardTitle}>
          <FiArrowRight className={styles.categoryTitleIcon} /> Conheça a Nossa
          Frota
        </h3>
        <div className={styles.cards}>
          {carrosFiltrados !== ''
            ? carrosFiltrados.map((carro) => (
                <Card
                  key={carro?.id}
                  id={carro?.id}
                  categoria={carro?.categoria}
                  nome={carro?.nome}
                  imagens={carro?.imagens}
                  descricao={carro?.descricao}
                />
              ))
            : carros}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
