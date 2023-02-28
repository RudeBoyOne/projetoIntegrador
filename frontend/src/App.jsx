import React from 'react';
import Header from './components/header/Header.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import SearchBar from './components/search/Search.jsx';
import './index.css';


function App() {

  return (

    <div className="App">
      <BrowserRouter>
        <Header />
                
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
