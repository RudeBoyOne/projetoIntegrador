import { id } from 'date-fns/locale';
import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  function fillUserDataState({
    email,
    token,
    nome,
    sobrenome,
    nomeESobrenome,
  }) {
    localStorage.setItem(
      '@system_user',
      JSON.stringify({ email, token, nome, sobrenome, nomeESobrenome })
    );
    setUserData({
      ...fillUserDataState,
      id: id,
      email: email,
      token: token,
      nome: nome,
      sobrenome: sobrenome,
      nomeESobrenome: nomeESobrenome,
    });
  }

  function emptyUserData() {
    setUserData({
      email: '',
      token: '',
      nome: '',
      sobrenome: '',
      nomeESobrenome: '',
    });
    localStorage.clear();
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