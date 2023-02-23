import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';

import './index.css';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
    <Home />
    </div>
  );
}

export default App;
