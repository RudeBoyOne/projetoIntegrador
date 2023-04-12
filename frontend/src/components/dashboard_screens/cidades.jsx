import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import styles from './dashboardScreens.module.css';

const Cidades = () => {
  const [cidades, setCidades] = useState([]);

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCidades();
  }, []);

  return (
    <div className={styles.dashScreens}>
      <div className={styles.dashContainerTitle}>
      <p>Cidades</p>
      </div>

      <div>
      <table id="cidades" className={styles.cidadeTable}>
          <thead>
            <tr>
              <th>Cidade</th>
              <th>País</th>
            </tr>
            {cidades !== ''
              ? cidades.map((cidade) => (
                  <>
                    <tr className={styles.cidadeDataTable}>
                      <td>{cidade.nome}</td>
                      <td>{cidade.pais}</td>                   
                    </tr>
                  </>
                ))
              : null}
          </thead>
        </table>
      </div>

    </div>
  );
};

export default Cidades;
