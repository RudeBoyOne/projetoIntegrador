import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthContext';
import { ProductContext } from '../../providers/ProductContext';
import { CidadeContext } from '../../providers/CidadeContext';

import Pdp_header from '../../components/pdp_header/pdp_header';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Pdp_local from '../../components/pdp_local/pdp_local';
import Pdp_gallery from '../../components/pdp_gallery/pdp_gallery';
import Description from '../../components/description/Description';
import Characteristics from '../../components/characteristics/Characteristics';
import Booking from '../../components/booking/Booking';
import AppPolicy from '../../components/policy/Policy';

import styles from './product.module.css';

import api from '../../services/api';

const Product = () => {
  const { id } = useParams();
  const [cidades, setCidades] = useState([]);
  const { userData } = useContext(AuthContext);
  const { fillDataProduct, detalheProduto } = useContext(ProductContext);
  const { setCidadeSelecionada, cidadeSelecionada } = useContext(CidadeContext);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const navigate = useNavigate();

  async function getCarrosById() {
    try {
      const response = await api.get(`/produtos/${id}`);
      setProdutoSelecionado(response.data);
      fillDataProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCarrosById();
  }, []);

  const bookingDetail = () => {
    const token = userData?.token;

    if (token) {
      navigate(`/reservas/${id}`);
    } else {
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      toast('Para fazer uma reserva você precisa estar logado.', {
        type: 'error',
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
    }
  };

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCidades();
  }, []);

  function handleSelectCidade(event) {
    const cidadeIdSelecionada = parseInt(event.target.value);
    const cidadeSelecionada = cidades.find(
      (cidade) => cidade.id === cidadeIdSelecionada
    );
    setCidadeSelecionada(cidadeSelecionada);
  }

  return (
    <>
      <Header />
      <div className={styles.productContainer}>
        <Pdp_header
          titulo={produtoSelecionado?.nome}
          categoria={produtoSelecionado?.categoria}
        />
        <div className={styles.produtoInfoReserva}>
          <Pdp_local
            local={produtoSelecionado?.cidade}
            cidades={cidades}
            onSelectCidade={handleSelectCidade}
          />
          <div>
            <Booking
              produtoSelecionado={produtoSelecionado}
              bookingDetail={bookingDetail}
              cidadeSelecionada={cidadeSelecionada}
            />
          </div>
        </div>
        <Description
          descricao={produtoSelecionado?.descricao}
          nomeCarro={produtoSelecionado?.nome}
        />
        <Pdp_gallery imagens={produtoSelecionado?.imagens} />
        <Characteristics
          caracteristicas={produtoSelecionado?.caracteristicas}
        />
        <AppPolicy />
      </div>
      <Footer />
    </>
  );
};

export default Product;
