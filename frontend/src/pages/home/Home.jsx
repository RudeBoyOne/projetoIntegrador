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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [listaCarrosByCidadeData, setListaCarrosByCidadeData] = useState([]);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const navigate = useNavigate();

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

  function handleSelecionarCidade(event) {
    setCidadeSelecionada(event.target.value);
  }

  useEffect(() => {
    if (range && range[0] && range[0].startDate && range[0].endDate) {
      const newInitialDate = range[0].startDate.toLocaleDateString('ja-JP');
      const newFinalDate = range[0].endDate.toLocaleDateString('ja-JP');
      if (newInitialDate && newFinalDate) {
        setDataInicial(newInitialDate);
        setDataFinal(newFinalDate);
      } else {
        console.error('As datas estão nulas ou indefinidas.');
      }
    }
  }, [range, dataInicial, dataFinal]);

  const novaDataInicial = dataInicial
    .split('/')
    .map((item) => item.padStart(2, '0'))
    .join('-');
  const novaDataFinal = dataFinal
    .split('/')
    .map((item) => item.padStart(2, '0'))
    .join('-');

  const validarData = (data) => {
    const regexData = /^\d{4}-\d{2}-\d{2}$/;
    return regexData.test(data);
  };

  const filtroPorCidadeEData = async () => {
    if (!validarData(novaDataInicial) || !validarData(novaDataFinal)) {
      toast.error('Por favor, selecione um período válido.', {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
      return;
    }
    try {
      await api
        .get(
          `/produtos/listarPorCidadeEDatas/${cidadeSelecionada}?dateStart=${novaDataInicial}&dateEnd=${novaDataFinal}`
        )
        .then((response) => {
          setListaCarrosByCidadeData(response.data);
        });
    } catch (error) {
      toast.error('Não foi possível realizar a busca, tente novamente!', {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
      console.error(error);
    }
  };

  const handleSearchForm = (event) => {
    event.preventDefault();
    filtroPorCidadeEData();
  };

  let cards;

  if (listaCarrosByCidadeData !== undefined) {
    cards = listaCarrosByCidadeData.map((carro) => (
      <>
        <div>
          <div className={styles.cards}>
            <Card
              key={carro?.id}
              id={carro?.id}
              categoria={carro?.categoria}
              nome={carro?.nome}
              imagens={carro?.imagens}
              descricao={carro?.descricao}
            />
          </div>
        </div>
      </>
    ));
  } else if (carrosFiltrados.length !== 0) {
    cards = carrosFiltrados.map((carro) => (
      <Card
        key={carro?.id}
        id={carro?.id}
        categoria={carro?.categoria}
        nome={carro?.nome}
        imagens={carro?.imagens}
        descricao={carro?.descricao}
      />
    ));
  } else {
    cards = carros.map((carro) => (
      <Card
        key={carro?.id}
        id={carro?.id}
        categoria={carro?.categoria}
        nome={carro?.nome}
        imagens={carro?.imagens}
        descricao={carro?.descricao}
      />
    ));
  }

  return (
    <div>
      <Header />
      <div className="navSearch">
        <SearchBar
          cidades={cidades}
          filtroPorCidades={filtroPorCidades}
          onFiltroPorCidadeEData={handleSearchForm}
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
            <CarrosList
              listaCarrosByCat={listaCarrosByCat}
              categoriaSelecionada={categoriaSelecionada}
            />
          </div>
        ) : (
          <></>
        )}

        <div className={styles.cards}>{cards}</div>

        <div>
          <h3 className={styles.cardTitle}>
            <FiArrowRight className={styles.categoryTitleIcon} /> Conheça nossa
            Frota
          </h3>
          <div className={styles.cards}>
            {carros.map((carro) => (
              <Card
                key={carro?.id}
                id={carro?.id}
                categoria={carro?.categoria}
                nome={carro?.nome}
                imagens={carro?.imagens}
                descricao={carro?.descricao}
              />
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Home;
