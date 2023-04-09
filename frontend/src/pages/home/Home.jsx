import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addDays, set } from 'date-fns';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import SearchBar from '../../components/search/Search';

import CardCategory from '../../components/category/Category';
import Card from '../../components/card/Card';
import CarrosList from './CarrosList';

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
  const [listaCarrosByCat, setListaCarrosByCat] = useState([]);
  const [dataInicial, setDataInicial] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [listaCarrosByCidadeData, setListaCarrosByCidadeData] = useState('');
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    getCidades();
    getCarros();
    getCategorias();
    setCarros([...new Set(carros.filter((item) => item.categoria))]);
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

  async function filtroPorCategoria(id) {
    try {
      const response = await api.get(
        `/produtos/listarPorCategoria?categoria=${id}`
      );
      setListaCarrosByCat(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (range && range[0] && range[0].startDate && range[0].endDate) {
      setDataInicial(range[0].startDate.toLocaleDateString('ja-JP'));
      setDataFinal(range[0].endDate.toLocaleDateString('ja-JP'));
    }
  }, [range]);

  function handleSelecionarCidade(event) {
    setCidadeSelecionada(event.target.value);
  }

  console.log(cidadeSelecionada);
  async function filtroPorCidadeEData(cidadeSelecionada) {
    try {
      if (cidadeSelecionada) {
        const response = await api.get(
          `/produtos/listarPorCidadeEDatas/${cidadeSelecionada.id}?dateStart=${dataInicial}&dateEnd=${dataFinal}`
        );
        setListaCarrosByCidadeData(response.data);
        console.log(listaCarrosByCidadeData);
      } else {
        setListaCarrosByCidadeData(carros);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <div>
      <Header />
      <div className="navSearch">
        <SearchBar
          cidades={cidades}
          filtroPorCidades={filtroPorCidades}
          onFiltroPorCidadeEData={filtroPorCidadeEData}
          range={range}
          setRange={setRange}
          onSelecionarCidade={handleSelecionarCidade}
        />
      </div>

      <div className={styles.category}>
        <h3 className={styles.categoryTitle}>
          <FiArrowRight className={styles.categoryTitleIcon} /> Pesquise por
          Categoria
        </h3>

        <div>
          <CardCategory
            categorias={categorias}
            filtroPorCategoria={filtroPorCategoria}
          />
        </div>
      </div>

      <div className={styles.cardContainer}>
        {listaCarrosByCat.length > 0 ? (
          <div>
            <CarrosList listaCarrosByCat={listaCarrosByCat} />
          </div>
        ) : (
          <></>
        )}

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
