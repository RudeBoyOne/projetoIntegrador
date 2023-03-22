import { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  function fillUserDataState({ token }) {
    localStorage.setItem('@system_user', JSON.stringify({ token }));
    setUserData({ ...fillUserDataState, token: token });
  }

  function emptyUserData() {
    setUserData({ username: '', token: '' });
  }

  useEffect(() => {
    const response = localStorage.getItem('@system_user');

    let user;

    if (response) {
      user = JSON.parse(response);
      fillUserDataState({
        username: user.username,
        token: user.token,
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
