import React, { useContext } from 'react';
import styles from './pdp_local.module.css';

import { CidadeContext } from '../../providers/CidadeContext';

export default function Pdp_local({
  local,
  cidades,
  onCidadeSelecionada,
  onSelectCidade
 
}) {
  

  return (
    <div className={styles.pdp_local_c}>
      <div className={styles.pdp_local_left}>
        <div className={styles.bookingTitleContainer}>
          <h2 className={styles.bookingTitle}>Local de Retirada</h2>
          <p>Selecione a cidade onde vai retirar o veículo.</p>
        </div>
        {/* <span className={styles.pdp_local_cidade}>{local?.nome}</span> */}
        {/* <span className={styles.pdp_local_pais}>{local?.pais}</span> */}
        <div className={styles.inputContainer}>
          <select
            title="cidades"
            name="cidades"
            onChange={onSelectCidade}
            // value={cidadeSelecionada}
            className={styles.inputDados}
          >
            <option value="" disable="true" className={styles.optionHide}>
              Onde vai retirar o carro?
            </option>
            {cidades
              ? cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome}
                  </option>
                ))
              : null}
          </select>
        </div>
      </div>
    </div>
  );
}
