import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);


  const navigate = useNavigate();

  async function getCarrosById() {
    try {
      const response = await api.get(`/produtos/${id}`);
      setProdutoSelecionado(response.data);
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
      }, 1000);

       toast('Para fazer uma reserva você precisa estar logado.', {
         type: 'error',
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
       });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.productContainer}>
        <Pdp_header
          titulo={produtoSelecionado?.nome}
          categoria={produtoSelecionado?.categoria}
        />
        <Pdp_local local={produtoSelecionado?.cidade} />
        <Pdp_gallery imagens={produtoSelecionado?.imagens} />
        <Description
          descricao={produtoSelecionado?.descricao}
          nomeCarro={produtoSelecionado?.nome}
        />
        <Characteristics
          caracteristicas={produtoSelecionado?.caracteristicas}
        />
        <Booking
          produtoSelecionado={produtoSelecionado}
          bookingDetail={bookingDetail}
        />
        <AppPolicy />
      </div>
      <Footer />
    </>
  );
};

export default Product;
