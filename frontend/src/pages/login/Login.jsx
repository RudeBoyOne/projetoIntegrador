import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './login.module.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function LoginPage() {
  const { userData, fillUserDataState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [formError, setFormError] = useState('');
  const [viewPassword, setViewPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  async function auth() {
    const response = await api.post('/login', {
      email: email,
      senha: senha,
    });
    console.log(response);
    // try {
    //   if (email.length <= 3 || senha.length < 6) {
    //     toast.error(
    //       'Login deve conter mais de 3 caracteres e senha mais de 6 caracteres. Tente novamente.',
    //       {
    //         autoClose: 4000,
    //         position: 'top-center',
    //         theme: 'colored',
    //       }
    //       );
    //     } else {
    //   const response = await api.post('/login', {
    //     email: email,
    //     senha: senha,
    //   });
    // }

   




    //   fillUserDataState({
    //     token: response.data.token,
    //     tipo: response.data.tipo,
    //   });
    //   localStorage.setItem('token', JSON.stringify(response.data.token));
    //   toast('Login efetuado com sucesso.', {
    //     type: 'success',
    //     autoClose: 2000,
    //     position: 'top-center',
    //     theme: 'colored',
    //   });

    //   setTimeout(() => {
    //     // navigate('/');
    //   }, 2000);
    // }
    // // } catch (error) {
    // //   toast.error('Erro ao fazer login, tente navamente', {
    // //     autoClose: 2500,
    // //     position: 'top-center',
    // //     theme: 'colored',
    // //   });
    // // }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Verificar se o email está válido
  //   const emailRegex = /^\S+@\S+\.\S+$/;
  //   if (!emailRegex.test(email)) {
  //     setFormError('* Por favor, digite um e-mail válido.');
  //     return;
  //   }

  //   // Verificar se a senha tem pelo menos 6 caracteres
  //   if (password.length < 6) {
  //     setFormError('* A senha deve ter pelo menos 6 caracteres.');
  //     return;
  //   }

  //   // Buscar os usuários cadastrados no storage
  //   const users = JSON.parse(localStorage.getItem('users')) || [];

  //   // Procurar o usuário com o email inserido no formulário
  //   const user = users.find(user => user.email === email);

  //   // Verificar se o usuário foi encontrado e se a senha está correta
  //   if (!user || user.password !== password) {
  //     setFormError('* E-mail ou senha incorretos. Por favor, tente novamente.');
  //     return;
  //   }
  //   // Se as informações estiverem corretas, redirecionar o usuário para a página principal
  //   window.location.href = '/';

  // };

  // const handleRememberMeChange = (event) => {
  //   setRememberMe(event.target.checked);
  // };

  return (
    <>
      <Header />
      <div className={styles.loginPage}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit}>
            <h2 className={styles.textLogin}>Login</h2>
            {formError && <div className={styles.formError}>{formError}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="text"
                id="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Senha:</label>
              <input
                type={viewPassword ? 'text' : 'password'}
                id="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              <div
                className={styles.icon}
                onClick={() => setViewPassword(!viewPassword)}
              ></div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.checkbox}>
                {/* <label className={styles.formControl}>
                  <input
                    className={styles.formCheckbox}
                    type="checkbox"
                    checked={true}
                    name="checkbox"
                    onChange={handleRememberMeChange}
                  />
                  Lembrar-me
                </label> */}
                <a href="#">Esqueci a senha</a>
              </div>

              <div className={styles.btn}>
                <button className={styles.btnLogin} type="submit">
                  Entrar
                </button>
              </div>
              <div className={styles.registerLink}>
                <span>
                  Ainda não tem uma conta?{' '}
                  <Link to="/Register">Criar conta</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
