import React, { useState, useEffect, useContext } from 'react';

import api from '../../services/api';
import { AuthContext } from '../../providers/AuthContext';

import { IoTrashOutline } from 'react-icons/io5';

import styles from './dashboardScreens.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [idRoles, setIdRoles] = useState([]);
  const { userData } = useContext(AuthContext);

  async function getRoles() {
    const headers = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.get("http://localhost:8080/usuarios/roles", headers)
        .then(await function (response) {
          setRoles(response.data)
        });
    } catch (error) {
      console.log(error);
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
      await axios.get("http://localhost:8080/usuarios", headers).then((response) => {
        const usuariosFiltrados = []
        response.data.forEach(usuario => {
            usuario?.roles.forEach(role => {
              if(role?.nome != "ADMIN"){
                usuariosFiltrados.push(usuario);
              }
          })
        })
        setUsuarios(usuariosFiltrados);
      })
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
    getRoles();
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
                <th>Adicionar Perfil</th>
                <th>Excluir</th>
              </tr>
              {usuarios !== ''
                ? usuarios.map((usuario) => (
                  <>
                    <tr key={usuario.id} className={styles.userDataTable}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.sobrenome}</td>
                      <td>{usuario.email}</td>
                      <td>


                        <select onChange={e => setIdRoles(e.target.value)} className={styles.tableSelect}>
                          <option> Selecione </option>
                          {
                            roles.map((role) => {
                              return <option className={styles.tableSelect} key={role.id} value={role.id}> {role.nome} </option>
                            })}

                        </select>
                         <button className={styles.buttonAdd}>+</button>


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
