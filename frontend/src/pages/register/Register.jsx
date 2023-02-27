import styles from './register.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !confirmEmail || !password) {
      setFormError('Por favor, preencha todos os campos.');
      return;
    }

    if (email !== confirmEmail) {
      setFormError('Os e-mails não coincidem. Por favor, tente novamente.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      setFormError('Este e-mail já foi cadastrado. Por favor, tente fazer login ou utilize outro e-mail.');
      return;
    }

    if (password.length < 6) {
      setFormError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password
    };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    window.location.href = '/Home';
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h2>Criar conta</h2>

          {formError && <div className={styles.formError}>{formError}</div>}

          <div className={styles.formGroup}>
            <div className={styles.formName}>
              <div><label htmlFor="firstName">Nome:</label>
             
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
               </div>
               <div>
              <label htmlFor="lastName">Sobrenome:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
              </div>
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
            <label htmlFor="confirmEmail">Confirmar E-mail:</label>
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(event) => setConfirmEmail(event.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">Criar conta</button>
        </form>
        <div className={styles.loginLink}>
          Já possui uma conta? <Link to="/Login">Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;