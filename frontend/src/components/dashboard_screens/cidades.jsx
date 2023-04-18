import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';

import styles from './dashboardScreens.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cidades = () => {
  const [cidades, setCidades] = useState([]);
  const [cadastrarCidade, setCadastrarCidade] = useState([]);
  const [cadastrarPais, setCadastrarPais] = useState([]);
  const { userData } = useContext(AuthContext);

  const navigate = useNavigate();

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      toast.error(error.response, {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
      console.error(error);
    }
  }

  useEffect(() => {
    getCidades();
  }, []);

  async function cadastrarNovaCidade(e) {
    e.preventDefault();
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      nome: cadastrarCidade,
      pais: cadastrarPais,
    });

    try {
      await api.post('/cidades', body, headers).then((response) => {
        toast('Cidade cadastrada com sucesso.', {
          type: 'success',
          autoClose: 2500,
          position: 'top-right',
          theme: 'colored',
        });
        getCidades();
        limparFormulario();
      });
    } catch (error) {
      toast.error('Ocorreu um erro ao cadastrar Cidade. Tente novamente.', {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
    }
    console.error(error);
    setCadastrarCidade('');
    setCadastrarPais('');
  }

  const limparFormulario = () => {
    setCadastrarCidade('');
    setCadastrarPais('');
    };


  return (
    <div key={cidades}>
      <div className={styles.dashContainerTitle}>
        <p>Cidades</p>
      </div>
      <div className={styles.dashScreens}>
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
      <div className={styles.dashCadastrarCidadeContainer}>
        <p>Cadastrar nova cidade</p>
        <div className={styles.dashBoxCadastrarCidade}>
          <form
            onSubmit={(event) => cadastrarNovaCidade(event)}
            className={styles.dashCadastrarCidade}
          >
            <input
              type="text"
              placeholder="Cidade"
              value={cadastrarCidade}
              onChange={(item) => setCadastrarCidade(item.target.value)}
            />
            <input
              type="text"
              placeholder="País"
              value={cadastrarPais}
              onChange={(item) => setCadastrarPais(item.target.value)}
            />
            <button>Cadastrar</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Cidades;
