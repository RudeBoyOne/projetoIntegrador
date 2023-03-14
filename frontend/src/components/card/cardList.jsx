import React from 'react';
import Card from './Card';

const cardList = ({ carros }) => {
  return (
    <div>
      <h3>Carros disponíveis</h3>
      {carros.map((carro) => (
        <Card
          key={carro?.id}
          qualificacao={carro?.qualificacao}
          nome={carro?.nome}
          urlImagem={carro?.image}
          descricao={carro?.descricao}
        />
      ))}
    </div>
  );
};

export default cardList;
