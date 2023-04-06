import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import CriarConta from '../pages/cadastro/CriarConta';
import Product from '../pages/product/product';
import Reservas from '../pages/reservas/Reservas';
import CriarProduto from '../pages/criarProduto/criarProduto';

import AuthProvider, { AuthContext } from '../providers/AuthContext';
import { ProductProvider } from '../providers/ProductContext';
import { CidadeProvider } from '../providers/CidadeContext';

const PrivateRoute = ({ children }) => {
  const { userData } = useContext(AuthContext);
  return userData.token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <CidadeProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criarconta" element={<CriarConta />} />
            <Route path="/produtos/:id" element={<Product />} />
            <Route
              path="/reservas/:id"
              element={
                <PrivateRoute>
                  <Reservas />
                </PrivateRoute>
              }
            />
            <Route
              path="/criarproduto"
              element={
                <PrivateRoute>
                  <CriarProduto />
                </PrivateRoute>
              }
            />
          </Routes>
        </CidadeProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default AppRoutes;
