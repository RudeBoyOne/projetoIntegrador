import { useEffect, useState, createContext } from 'react';

export const CidadeContext = createContext({});

export const CidadeProvider = ({ children }) => {
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');

  return (
    <CidadeContext.Provider value={{ cidadeSelecionada, setCidadeSelecionada }}>
      {children}
    </CidadeContext.Provider>
  );
};
