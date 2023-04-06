import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './criarProduto.module.css';
import { FiPlus } from 'react-icons/fi';

const CriarProduto = () => {
  const [cidades, setCidades] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [caracteristica, setCaracteristica] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [inputs, setInputs] = useState(['']);
  const [showInputs, setShowInputs] = useState(false);
  const [nomeCaracteristica, setNomeCaracteristica] = useState('');
  const [urlIcone, setUrlIcone] = useState('');

  async function getCategoria() {
    try {
      const response = await api.get('/categorias');
      setCategoria(response.data);
      setCategoriaSelecionada(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCidades() {
    try {
      const response = await api.get('/cidades');
      setCidades(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCaracteristica() {
    try {
      const response = await api.get('/caracteristicas');
      setCaracteristica(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCidades();
    getCategoria();
    getCaracteristica();
  }, []);

  function adicionarInput() {
    setInputs([...inputs, '']);
  }

  function handleChange(event, index) {
    const novosInputs = [...inputs];
    novosInputs[index] = event.target.value;
    setInputs(novosInputs);
  }

  const handleAddCaracteristica = (e) => {
    e.preventDefault();
    setShowInputs(true);
  };

  const handleNomeChange = (event) => {
    setNomeCaracteristica(event.target.value);
  };

  const handleUrlIconeChange = (event) => {
    setUrlIcone(event.target.value);
  };

  async function incluirCaracteristica(e) {
    e.preventDefault();
    console.log('teste');
    try {
      await api
        .post('/caracteristicas', {
          nome: nomeCaracteristica,
          icone: urlIcone,
        })
        .then((response) => {
          toast('Característica criada com sucesso.', {
            type: 'success',
            autoClose: 2500,
            position: 'top-right',
            theme: 'colored',
          });
        });
      console.log(response.data);
    } catch (error) {
      toast.error('Erro ao criar caracteristica, tente navamente', {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.criarProdutoContainer}>
        <h2 className={styles.criarProdutoTitle}>Inclusão de Veículo</h2>
        <form className={styles.criarProdutoForm}>
          <div className={styles.formContainer}>
            <h3>Propriedades</h3>
            <input
              type="text"
              placeholder="Nome do Produto"
              className={styles.inputDados}
            />
            <div className={styles.inputSelectContainer}>
              <div className={styles.inputSelect}>
                <select
                  title="categoria"
                  name="categoria"
                  // onChange={onCidadeSelecionada}
                  value={categoria.id}
                  className={styles.inputDados}
                >
                  <option value="" disable="true" className={styles.optionHide}>
                    Categoria
                  </option>
                  {categoria
                    ? categoria.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.qualificacao}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className={styles.inputSelect}>
                <select
                  title="cidades"
                  name="cidades"
                  // onChange={onCidadeSelecionada}
                  value={cidades.id}
                  className={styles.inputDados}
                >
                  <option value="" disable="true" className={styles.optionHide}>
                    Cidade
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
            <textarea
              className={styles.inputDados}
              rows={3}
              placeholder="Descreva o veículo"
            />
          </div>
          <div className={styles.formContainer}>
            <h3>Características</h3>
            <p>
              <small>
                Marque todas as opções referente ao veículo que está
                cadastrando.
              </small>
            </p>
            <div className={styles.checkboxConteiner}>
              {caracteristica.map((caracteristica) => (
                <label
                  htmlFor={caracteristica.id}
                  className={styles.checkboxItem}
                >
                  <input
                    type="checkbox"
                    id={caracteristica.id}
                    name={caracteristica.nome}
                    value={caracteristica.nome}
                    className={styles.checkboxForm}
                  ></input>
                  {caracteristica.nome}
                </label>
              ))}
            </div>
            <div className={styles.novaCaracteristica}>
              <button
                type="submit"
                onClick={handleAddCaracteristica}
                className={styles.btnNovaCaracteristica}
              >
                <FiPlus />
                Nova Característica
              </button>
              <div>
                {showInputs && (
                  <div className={styles.inputNovaCaracteristicaContainer}>
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
                    <button
                      type="submit"
                      className={styles.btnCriarNovaCaracteristica}
                      onClick={() => incluirCaracteristica()}
                    >
                      Enviar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.formContainer}>
            <h3>Imagens</h3>
            <p>
              <small>
                Cole a URL das imagens do veículo que está cadastrando.
              </small>
            </p>
            {inputs.map((input, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={input}
                  onChange={(event) => handleChange(event, index)}
                  className={styles.inputUrlImage}
                />
                {index === inputs.length - 1 && (
                  <button
                    type="button"
                    onClick={adicionarInput}
                    className={styles.inputPlusIcon}
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className={styles.formContainer}>
            <h3>Observações</h3>
            <div className={styles.formObservacoes}>
              <div>
                <p>
                  <small>
                    Ao incluir um novo veículo, as políticas aplicadas em nosso
                    site serão exibidas na página de detalhes deste carro.
                  </small>
                </p>
              </div>
              <div className={styles.btnFormObservacoes}>
                <button type="submit" className="button-dark">
                  Incluir Veículo
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default CriarProduto;
