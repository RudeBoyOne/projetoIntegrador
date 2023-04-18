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
  const [deletado, setDeletado] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  async function deletar(id) {
    if (!id) {
      return;
    }
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };
    try {
      await api.delete(`/usuarios/${id}`, headers);
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
      setModalIsOpen(false);
      setDeletado(true);
      getUsuarios();
      toast.success('Usuário deletado com sucesso!', {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao deletar usuário.', {
        autoClose: 2500,
        position: 'top-center',
        theme: 'colored',
      });
    }
  }

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
                ? usuarios.map((usuario, index) => (
                    <>
                      <tr key={`${usuario.nome}-${usuario.sobrenome}-${usuario.email}-${index}`} className={styles.userDataTable}>
                        <td>{usuario.nome}</td>
                        <td>{usuario.sobrenome}</td>
                        <td>{usuario.email}</td>
                        <td>
                          <select className={styles.tableSelect }>
                            <option className={styles.tableOption} disabled>Selecione</option>
                            <option className={styles.tableOption}>Client</option>
                            <option>User</option>
                          </select>
                        </td>
                        <td >
                        <button className={styles.tableIcon} onClick={() => deletar(usuario.id)}><IoTrashOutline/></button>
                          
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
