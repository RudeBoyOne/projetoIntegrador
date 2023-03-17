import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Pdp_header from '../../components/pdp_header/pdp_header';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Pdp_local from '../../components/pdp_local/pdp_local';
import Pdp_gallery from '../../components/pdp_gallery/pdp_gallery';
import Description from '../../components/description/Description';
import Characteristics from '../../components/characteristics/Characteristics';
import Booking from '../../components/booking/Booking';
import AppPolicy from '../../components/policy/Policy';


import api from '../../services/api';

import styles from './product.module.css';

const Product = () => {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const { id } = useParams();

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

  return (
    <>
      <Header />
      <div className={ styles.productContainer }>
        <Pdp_header
          titulo={ produtoSelecionado?.nome }
          categoria={ produtoSelecionado?.categoria }
        />
        <Pdp_local local={ produtoSelecionado?.cidade } />
        <Pdp_gallery imagens={ produtoSelecionado?.imagens }/>
        <Description  descricao={ produtoSelecionado?.descricao } 
                      nomeCarro={ produtoSelecionado?.nome }
        />
        <Characteristics caracteristicas={ produtoSelecionado?.caracteristicas } />
        <Booking />
        <AppPolicy />
      </div>
      <Footer />
    </>
  );
};

export default Product;
