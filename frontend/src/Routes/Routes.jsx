import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import CriarConta from '../pages/cadastro/CriarConta';
import Product from '../pages/product/product';
import Reservas from '../pages/reservas/Reservas';
// import Logout from '../components/logout/Logout';

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/criarconta" element={<CriarConta />} />
      <Route path='/produtos/:id' element={<Product />} />
      <Route path="/reservas/:id" element={<Reservas />} />
      
      </Routes>
     // </BrowserRouter>
  );
};

export default AppRoutes;
