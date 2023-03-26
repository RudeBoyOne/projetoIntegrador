import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Product from '../pages/product/product';

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/produtos/:id' element={<Product />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default AppRoutes;
