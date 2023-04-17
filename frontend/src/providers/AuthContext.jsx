import { id } from 'date-fns/locale';
import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  function fillUserDataState({
    id,
    email,
    token,
    nome,
    sobrenome,
    nomeESobrenome,
    roles,
  }) {
    localStorage.setItem(
      '@system_user',
      JSON.stringify({
        id,
        email,
        token,
        nome,
        sobrenome,
        nomeESobrenome,
        roles,
      })
    );
    setUserData({
      ...useState,
      id: id,
      email: email,
      token: token,
      nome: nome,
      sobrenome: sobrenome,
      nomeESobrenome: nomeESobrenome,
      roles: roles,
    });
    setIsLogin(true);
  }

  function emptyUserData() {
    setUserData({
      id: '',
      email: '',
      token: '',
      nome: '',
      sobrenome: '',
      nomeESobrenome: '',
      roles: '',
    });
    localStorage.clear();
    setIsLogin(false);
  }

  useEffect(() => {
    const response = localStorage.getItem('@system_user');

    let user;

    if (response) {
      user = JSON.parse(response);
      fillUserDataState({
        id: user.id,
        email: user.email,
        token: user.token,
        nome: user.nome,
        sobrenome: user.sobrenome,
        nomeESobrenome: user.nomeESobrenome,
        roles: user.roles,
      });
      navigate('/');
    }
  }, []);




  return (
    <AuthContext.Provider
      value={{
        userData,
        fillUserDataState,
        emptyUserData,
        isLogin,
        setIsLogin,
        
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
