import RegisterPage from '../../pages/register/Register';
import styles from './formularioReserva.module.css';
import { useState } from 'react';

const FormularioReserva = ( ) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value),
    setLastName(event.target.value),
    setEmail(event.target.value)

    RegisterPage();
    
  }

  return (
    <>
      <form>
        <div className={styles.inputContainer}>
          <label htmlFor="nome" className={styles.nome}>Nome</label>
          <input label="Nome" value={firstName} id="nome"  onChange={handleFirstNameChange.firstName} className={styles.nome} disabled/>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="sobrenome" className={styles.sobrenome}>Sobrenome</label>
          <input type="text" value={lastName} id="sobrenome" onChange={handleFirstNameChange.lastName} className={styles.sobrenome} disabled/>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.email}>Email</label>
          <input type="text" value={email} id="email" onChange={handleFirstNameChange.email} className={styles.email} disabled/>
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="cidade" className={styles.cidade}>Cidade</label>
          <input type="text" name="text" id="cidade" placeholder="Digite a cidade" className={styles.cidade} required/>
        </div>
      </form>
    </>
  )
}

export default FormularioReserva;