import { useState } from 'react';
// import Home from '../pages/home/Home';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Product from '../pages/product/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/produtos/:id' element={<Product />} />
    </Routes>
    // </BrowserRouter>
  );
};

export default AppRoutes;
