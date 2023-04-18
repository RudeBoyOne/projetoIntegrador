import React, { useState, useEffect, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';

import { IoTrashOutline } from 'react-icons/io5';

import styles from './dashboardScreens.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const { userData } = useContext(AuthContext);

  async function getUsuarios() {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      await api.get('/usuarios', headers).then((response) => {
        setUsuarios(response.data);
      });
    } catch (error) {
      toast.error(error.response, {
        autoClose: 2500,
        position: 'top-right',
        theme: 'colored',
      });
      console.log(error);
    }
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <>
      <div className={styles.dashScreens}>
        <div className={styles.dashContainerTitle}>
          <p>Usuários</p>
        </div>
        <div>
          <table id="usuarios" className={styles.userTable}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Email</th>
                <th>Editar</th>
                <th>Excluir</th>
              </tr>
              {usuarios !== ''
                ? usuarios.map((usuario) => (
                    <>
                      <tr className={styles.userDataTable}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.sobrenome}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <select className={styles.tableSelect }>
                            <option className={styles.tableOption} >Selecione</option>
                            <option className={styles.tableOption}>Client</option>
                            <option>User</option>
                          </select>
                        </td>
                        <td className={styles.tableIcon}>
                          <IoTrashOutline />
                        </td>
                      </tr>
                    </>
                  ))
                : null}
            </thead>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Users;
