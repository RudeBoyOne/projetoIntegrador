import { useState, useContext } from 'react';
import styles from './formularioReserva.module.css';

import { AuthContext } from '../../providers/AuthContext';

const FormularioReserva = () => {
  const { userData } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value),
      setLastName(event.target.value),
      setEmail(event.target.value);

    RegisterPage();
  };

  return (
    <>
      <h1 className={styles.titleForm}>Complete os seus dados</h1>
      <form className={styles.formReserva}>
        <div className={styles.inputContainer}>
          <label htmlFor="nome" className={styles.nome}>
            Nome
          </label>
          <input
            label="Nome"
            value={userData?.nomeESobrenome?.trim().split(' ')[0]}
            id="nome"
            className={styles.inputDados}
            disabled
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="sobrenome" className={styles.sobrenome}>
            Sobrenome
          </label>
          <input
            type="text"
            value={userData?.nomeESobrenome?.trim().split(' ')[1]}
            id="sobrenome"
            className={styles.inputDados}
            disabled
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.email}>
            Email
          </label>
          <input
            type="text"
            value={userData.email}
            id="email"
            className={styles.inputDados}
            disabled
          />
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cidade" className={styles.cidade}>
            Cidade
          </label>
          <input
            type="text"
            name="text"
            id="cidade"
            placeholder="Digite a cidade"
            className={styles.inputDados}
            required
          />
        </div>
      </form>
    </>
  );
};

export default FormularioReserva;