import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/Search';

import CategorieList from '../../components/category/categoriesList';
import Card from '../../components/card/Card';

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
      } else {
        setCarrosFiltrados(carros);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function filtroPorCategorias(id) {
    try {
      if (id) {
        const response = await api.get(
          `/produtos/listarPorCategoria?categoria=${id}`
        );
        setCarrosFiltrados(response.data);
      } else {
        setCarrosFiltrados(carros);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          filtroPorCategorias={filtroPorCategorias}
        />
        <div className={styles.categoryCard}></div>
      </div>

      

      <div className={styles.cardContainer}>
        <h3 className={styles.cardTitle}>
          <FiArrowRight className={styles.categoryTitleIcon} /> Conheça a Nossa
          Frota
        </h3>
        <div className={styles.cards}>
          {carros.map((carro) => (
            <Card
              key={carro?.id}
              id={carro?.id}
              qualificacao={carro?.qualificacao}
              nome={carro?.nome}
              urlImagem={carro?.image}
              descricao={carro?.descricao}
              onClick={() => console.log(carro?.id)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
