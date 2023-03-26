import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Product from '../pages/product/product';
import Reservas from '../pages/reservas/Reservas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/produtos/:id' element={<Product />} />
      <Route path="/reservas/:id" element={<Reservas />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default AppRoutes;
