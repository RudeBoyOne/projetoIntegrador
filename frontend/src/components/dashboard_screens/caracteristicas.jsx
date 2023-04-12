import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import NovaCaracteristica from '../../components/nova_caracteristica/novaCaracteristica';

import styles from './dashboardScreens.module.css';

const Caracteristicas = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);

  async function getCaracteristicas() {
    try {
      const response = await api.get('/caracteristicas');
      setCaracteristicas(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCaracteristicas();
  }, []);

  return (
    <>
    
    
    <div className={styles.dashScreens}>
      <div className={styles.dashContainerTitle}>
      <p>Características</p>
      </div>

      <div>
      <table id="caracteristicas" className={styles.caracteristicaTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Url</th>
            </tr>
            {caracteristicas !== ''
              ? caracteristicas.map((caracteristica) => (
                  <>
                    <tr className={styles.caracteristicaDataTable}>
                      <td>{caracteristica.nome}</td>
                      <td>{caracteristica.icone}</td>                   
                    </tr>
                  </>
                ))
              : null}
          </thead>
        </table>
      </div>
    </div>

     
      <div className={styles.dashIncluirCaracteristica}>
        <p>Incluir Nova Característica</p>
        <NovaCaracteristica />
      </div>
      </>
  );
};

export default Caracteristicas;
