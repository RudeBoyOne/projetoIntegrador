import { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';

import api from '../services/api';

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
  // const { id } = useParams();
  const [detalheProduto, setDetalheProduto] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

const fillDataProduct = (produto) => {
  setDetalheProduto(produto);
}


  return (
    <ProductContext.Provider
      value={{  detalheProduto, fillDataProduct, setDetalheProduto }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
