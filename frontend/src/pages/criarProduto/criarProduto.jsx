import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import api from '../../services/api';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NovaCaracteristica from '../../components/nova_caracteristica/novaCaracteristica';
import Back_button from '../../components/back_button/back_button';
import { AuthContext } from '../../providers/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './criarProduto.module.css';
import { FiPlus } from 'react-icons/fi';

const CriarProduto = () => {
  const { userData } = useContext(AuthContext);
  const [cidades, setCidades] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [caracteristica, setCaracteristica] = useState([]);
  const [caracteristicaSelecionada, setCaracteristicaSelecionada] = useState(
    []
  );
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [inputs, setInputs] = useState(['']);
  const [showInputs, setShowInputs] = useState(false);
  const [propriedadesCarro, setPropriedadesCarro] = useState({
    nome: '',
    vin: '',
    categoria: '',
    cidade: '',
    descricao: '',
  });
  const [caracteristicaCarro, setCaracteristicaCarro] = useState({});
  // const [imagens, setImagens] = useState(
  //   Array(5).fill({ titulo: '', url: '' })
  // );
  const [imagens, setImagens] = useState([]);
  const [idImagem, setIdImagem] = useState('');
  const [urlUpload, setUrlUpload] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [imagensIds, setImagensIds] = useState([]);

  const navigate = { useNavigate };

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

  function getPropriedadesCarro(event) {
    const { name, value } = event.target;
    setPropriedadesCarro({ ...propriedadesCarro, [name]: value });
  }

  function getCaracteristicaCarro(nomeCheckbox) {
    return function (event) {
      const checked = event.target.checked;
      setCaracteristicaCarro({
        ...caracteristicaCarro,
        [nomeCheckbox]: checked,
      });
      setCaracteristicaSelecionada((prev) => ({
        ...prev,
        [event.target.value]: checked,
      }));
    };
  }

  function removeSpaces() {
    const vinSemEspaco = propriedadesCarro.vin.trim();
  }

  function getImages(event, index, propriedade) {
    const target = event.target;
    const value = target.value;

    setImagens(
      imagens.map((imagem, i) => {
        if (i === index) {
          return { ...imagem, [propriedade]: value };
        } else {
          return imagem;
        }
      })
    );
  }

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

  function handleIncluirCarro(e) {
    e.preventDefault();
    uploadImagens();
    incluirCarro();
    // exibirMiniaturas(imagensInput, miniaturasDiv);
  }

  function limparFormulario() {
    setPropriedadesCarro({
      nome: '',
      vin: '',
      categoria: '',
      cidade: '',
      descricao: '',
    });
    setCaracteristicaCarro({});
    setCaracteristicaSelecionada([]);
    setImagens(Array(5).fill({ titulo: '', url: '' }));
  }

  async function handleImageChange(event) {
    const files = event.target.files;

    setImagens(files);
  }
  console.log(imagens);

  const uploadImagens = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = {
      name: '',
      contentType: '',
      contentLength: '',
    };

    Promise.all(
      imagens.map(async (imagem, index) => {
        body.name = imagem.name;
        body.contentType = imagem.type;
        body.contentLength = imagem.size;
        try {
          const response = await api.post('/upload/imagens', body, headers);
          const data = response.data;
          console.log(data);
          setImagensIds(...imagensIds, response.data.imagemId);
          console.log(imagensIds);
          putImages(data.uploadSignedUrl, imagem);
        } catch (error) {
          console.error(error.response);
        }
      })
    );
  };

  const putImages = (url, file) => {
    fetch(url, {
      method: 'PUT',
      body: file,
    }).then((response) => {
      console.log(response);
    });
  };

  const imagensInput = document.getElementById('imagens');
  const miniaturasDiv = document.getElementById('miniaturas');

  function exibirMiniaturas(imagensInput, miniaturasDiv) {
    imagensInput.addEventListener('change', (e) => {
      const files = e.target.files;
      console.log(files);

      for (let i = 0; i < files.lenght; i++) {
        const file = files[i];

        const img = document.createElement('img');

        img.src = URL.createObjectURL(file);
        img.width = 80;
        img.height = 80;

        miniaturasDiv.appendChild(img);
      }
    });
  }

  async function incluirCarro() {
    const caracteristicasSelecionadasIds = Object.entries(
      caracteristicaSelecionada
    )
      .filter(([, selecionado]) => selecionado)
      .map(([id]) => id);

    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      nome: propriedadesCarro.nome,
      descricao: propriedadesCarro.descricao,
      vin: propriedadesCarro.vin,
      caracteristicas: caracteristicasSelecionadasIds,
      imagens: imagensIds,
      categoria: propriedadesCarro.categoria,
      cidade: propriedadesCarro.cidade,
    });

    console.log(body);

    try {
      if (
        !propriedadesCarro.nome ||
        !propriedadesCarro.descricao ||
        !propriedadesCarro.vin ||
        !caracteristicasSelecionadasIds ||
        !imagens ||
        !propriedadesCarro.categoria ||
        !propriedadesCarro.cidade
      ) {
        toast.error('Todos os campos são de preenchimento obrigatório.', {
          autoClose: 2500,
          position: 'top-right',
          theme: 'colored',
        });
      } else {
        await api.post('/produtos', body, headers).then((response) => {
          toast('Veículo incluído com sucesso.', {
            type: 'success',
            autoClose: 2500,
            position: 'top-right',
            theme: 'colored',
          });
          limparFormulario();
          navigate('/criarproduto');
        });
      }
    } catch (error) {
      toast.error(error.response, {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
      console.log(error);
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.criarProdutoContainer}>
        <div className={styles.criarProdutoTitle}>
          <p>Inclusão de Novo Veículo</p>
          <Back_button />
        </div>
        <form className={styles.criarProdutoForm} onSubmit={handleIncluirCarro}>
          <div className={styles.formContainer}>
            <h3>Propriedades</h3>
            <p>
              <small>Insira os dados do veículo</small>
            </p>
            <input
              type="text"
              placeholder="Nome do Produto"
              name="nome"
              className={styles.inputDados}
              value={propriedadesCarro.nome}
              onChange={getPropriedadesCarro}
            />
            <input
              type="text"
              placeholder="Chassi (vin)"
              name="vin"
              className={styles.inputDados}
              value={propriedadesCarro.vin}
              onChange={getPropriedadesCarro}
            />
            <div className={styles.inputSelectContainer}>
              <div className={styles.inputSelect}>
                <select
                  title="categoria"
                  name="categoria"
                  onChange={getPropriedadesCarro}
                  value={propriedadesCarro.categoria}
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
                  name="cidade"
                  onChange={getPropriedadesCarro}
                  value={propriedadesCarro.cidade}
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
              onChange={getPropriedadesCarro}
              value={propriedadesCarro.descricao}
              name="descricao"
            />
          </div>

          <div className={styles.formContainer}>
            <h3>Imagens</h3>
            <p>
              <small>
                Cole a URL das imagens do veículo que está cadastrando. No
                mínimo 5 imagens.
              </small>
            </p>

            <div>
              <input
                type="file"
                id="imagens"
                name="imagens"
                onChange={handleImageChange}
                multiple
              />
              <div id="miniaturas"></div>
            </div>
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
                  key={caracteristica.id}
                  className={styles.checkboxItem}
                >
                  <input
                    type="checkbox"
                    id={caracteristica.id}
                    name={caracteristica.nome}
                    value={caracteristica.id}
                    checked={caracteristicaCarro[caracteristica.nome] || false}
                    onChange={getCaracteristicaCarro(caracteristica.nome)}
                    className={styles.checkboxForm}
                  ></input>
                  {caracteristica.nome}
                </label>
              ))}
            </div>
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

        <div className={styles.bottomContainer}>
          <div className={styles.formContainer}>
            <div className={styles.novaCaracteristica}>
              <button
                type="submit"
                onClick={handleAddCaracteristica}
                className={styles.btnNovaCaracteristica}
              >
                <FiPlus />
                Nova Característica
              </button>
              <div>{showInputs && <NovaCaracteristica />}</div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default CriarProduto;
