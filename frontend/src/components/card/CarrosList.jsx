import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from './Card';

import api from '../../services/api';

import styles from './card.module.css';

const CarrosList = () => {
  const [listaCarros, setListaCarros] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const { id } = useParams();

  async function getCarrosFiltradosByCat() {
    try {
      let url = '/produtos';
      if (id) {
        url = `/produtos/listarPorCategoria?categoria=${id}`;
      }
      const response = await api.get(url);
      setListaCarros(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCarrosFiltradosByCat(categoriaSelecionada);
  }, [categoriaSelecionada]);

 

  return (
    <div>
      <h3>Carros disponíveis na Categoria</h3>
      <div className={styles.cardList}>
      {listaCarros.map((carro) => (
        <Card
          key={carro?.id}
          id={carro?.id}
          categoria={carro?.categoria}
          nome={carro?.nome}
          urlImagem={carro?.image}
          descricao={carro?.descricao}
        />
      ))}
      </div>
      
    </div>
  );
};

export default CarrosList;
