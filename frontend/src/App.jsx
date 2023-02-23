import { useState } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import './index.css';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
    <Header/>
    </div>
  );
}

export default App;
