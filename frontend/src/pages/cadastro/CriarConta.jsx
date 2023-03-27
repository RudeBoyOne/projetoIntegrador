import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../providers/AuthContext';
import api from '../../services/api';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './criarconta.module.css';

function CriarConta() {
  const { fillUserDataState } = useContext(AuthContext);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    CriarConta();
  };

  async function CriarConta() {
    const response = await api.post('/usuarios', {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      senha: senha,
    });
    console.log(response.data);
    toast('Sua conta foi criada com sucesso.', {
      type: 'success',
      autoClose: 2500,
      position: 'top-center',
      theme: 'colored',
    });

    setTimeout(() => {
      navigate('/');
    }, 2500);
  }

  // async function CriarConta() {
  //   try {
  //     const emailRegex = /^\S+@\S+\.\S+$/;
  //     if (!nome || !sobrenome || !email || !senha) {
  //       setFormError('* Por favor, preencha todos os campos.');
  //       return;
  //     } else if (!emailRegex.test(email)) {
  //       setFormError('* Por favor, digite um e-mail válido.');
  //       return;
  //     } else if (senha.length < 6) {
  //       setFormError('* A senha deve ter pelo menos 6 caracteres.');
  //       return;
  //     } else {
  //       await api
  //         .post('/usuarios', {
  //           nome: nome,
  //           sobrenome: sobrenome,
  //           email: email,
  //           senha: senha,
  //         })
  //         .then((response) => {
  //           console.log(response.data);
  //           toast('Sua conta foi criada com sucesso.', {
  //             type: 'success',
  //             autoClose: 2500,
  //             position: 'top-center',
  //             theme: 'colored',
  //           });

  //           setTimeout(() => {
  //             navigate('/');
  //           }, 2500);
  //         });
  //     }
  //   } catch (error) {
  //     toast.error('Erro ao criar a sua conta, tente navamente', {
  //       autoClose: 2500,
  //       position: 'top-center',
  //       theme: 'colored',
  //     });
  //   }
  // }

  // const users = JSON.parse(localStorage.getItem('users')) || [];
  // const emailExists = users.some((user) => user.email === email);
  // if (emailExists) {
  //   setFormError(
  //     'Este e-mail já foi cadastrado. Por favor, tente fazer login ou utilize outro e-mail.'
  //   );
  //   return;
  // }

  return (
    <>
      <Header />
      <div className={styles.registerPage}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.formGroup}>
            <h2>Criar conta</h2>

            {formError && <div className={styles.formError}>{formError}</div>}

            <div className={styles.formName}>
              <div>
                <label htmlFor="nome">Nome:</label>

                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="sobrenome">Sobrenome:</label>
                <input
                  type="text"
                  id="sobrenome"
                  value={sobrenome}
                  onChange={(event) => setSobrenome(event.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <button type="submit">Criar conta</button>
          </form>
          <div className={styles.loginLink}>
            Já possui uma conta? <Link to="/Login">Faça o login</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default CriarConta;
