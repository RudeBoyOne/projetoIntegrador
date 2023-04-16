import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';

import styles from './home.module.css';

const CarrosListCidadeData = ({ listaCarrosByCidadeData, categoriaSelecionada }) => {
  console.log(listaCarrosByCidadeData);
  return (
    <div>
      <h3>Carros disponíveis na Categoria Selecionada</h3>
      <div className={styles.cardCategoryList}>
        {listaCarrosByCidadeData !== ''
          ? listaCarrosByCidadeData.map((carro) => (
              <Card
                key={carro?.id}
                id={carro?.id}
                categoria={carro?.categoria}
                nome={carro?.nome}
                imagens={carro?.imagens}
                descricao={carro?.descricao}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default CarrosListCidadeData;
