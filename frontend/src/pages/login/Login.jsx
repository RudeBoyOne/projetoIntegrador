import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import styles from './login.module.css';

function LoginPage() {
  const { userData, fillUserDataState, isLoggin, setIsLoggin } =
    useContext(AuthContext);
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
    try {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        setFormError('* Por favor, digite um e-mail válido.');
        return;
      } else if (senha.length < 6) {
        {
          setFormError('* A senha deve ter pelo menos 6 caracteres.');
          return;
        }
      } else {
        const response = await api.post('/login', {
          email: email,
          senha: senha,
        });

        fillUserDataState({
          token: response.data.token,
          email: response.data.email,
          nomeESobrenome: response.data.nomeESobrenome,
          id: response.data.id,
        });

        toast('Login efetuado com sucesso.', {
          type: 'success',
          autoClose: 2500,
          position: 'top-right',
          theme: 'colored',
        });

        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    } catch (error) {
      toast.error('Erro ao fazer login, tente novamente', {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
    }
  }

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

              {formError && <div className={styles.formError}>{formError}</div>}
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
      <ToastContainer />
      <Footer />
    </>
  );
}

export default LoginPage;
