import React, { useState, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';

import styles from './novaCaracteristica.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NovaCaracteristica = ({ getCaracteristicas }) => {
  const [nomeCaracteristica, setNomeCaracteristica] = useState('');
  const [urlIcone, setUrlIcone] = useState('');
  const { userData } = useContext(AuthContext);

  const handleNomeChange = (event) => {
    setNomeCaracteristica(event.target.value);
  };

  const handleUrlIconeChange = (event) => {
    setUrlIcone(event.target.value);
  };

  async function incluirCaracteristica() {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    console.log(userData.token);
    const body = JSON.stringify({
      nome: nomeCaracteristica,
      icone: urlIcone,
    });

    try {
      await api.post('/caracteristicas', body, headers).then((response) => {
        toast('Característica criada com sucesso.', {
          type: 'success',
          autoClose: 2500,
          position: 'top-right',
          theme: 'colored',
        });
        getCaracteristicas();
        limparFormulario();
      });
    } catch (error) {
      toast.error(error.response.data, {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
      console.log(error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    incluirCaracteristica();
  }

  const limparFormulario = () => {
    setNomeCaracteristica('');
    setUrlIcone('');
    };

   

  return (
    <div className={styles.inputNovaCaracteristicaContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="nome"
            value={nomeCaracteristica}
            placeholder="Característica"
            onChange={handleNomeChange}
            className={styles.inputNovaCaracteristica}
          />
        </div>
        <div>
          <input
            type="text"
            id="urlIcone"
            value={urlIcone}
            placeholder="Url do ícone"
            onChange={handleUrlIconeChange}
            className={styles.inputNovaCaracteristica}
          />
        </div>
        <button type="submit" className={styles.btnCriarNovaCaracteristica}>
          Enviar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NovaCaracteristica;
