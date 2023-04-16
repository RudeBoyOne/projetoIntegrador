import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import styles from './dashboardScreens.module.css';

const Frota = () => {
  const [carros, setCarros] = useState([]);

  async function getCarros() {
    try {
      const response = await api.get('/produtos');
      setCarros(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCarros();
  }, []);

  return (
    <div className={styles.dashScreens}>
      <div className={styles.dashContainerTitle}>
        <p>Frota</p>
        <Link to="/criarproduto" className={styles.btnIncluirCarro}>
          Incluir Novo Veículo
        </Link>
      </div>

      <div>
        <table id="frota" className={styles.frotaTable}>
          <thead>
            <tr className={styles.dashTableTr}>
              <th>Nome</th>
              <th>Vin</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Cidade</th>
            </tr>
            {carros !== ''
              ? carros.map((carro) => (
                  <>
                    <tr className={styles.frotaDataTable}>
                      <td>{carro.nome}</td>
                      <td>{carro.vin}</td>
                      <td>{carro.descricao}</td>
                      <td>{carro.categoria.qualificacao}</td>
                      <td>{carro.cidade.nome}</td>
                    </tr>
                  </>
                ))
              : null}
          </thead>
        </table>
      </div>

      <div className={styles.btnBottom}>
        <Link to="/criarproduto" className={styles.btnIncluirCarro}>
          Incluir Novo Veículo
        </Link>
      </div>
    </div>
  );
};

export default Frota;
