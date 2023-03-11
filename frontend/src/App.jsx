import { useState } from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import './index.css';
import Booking from './components/booking/Booking';

function App() {
  return (
    <div className="App">
    {/* <Header/> */}
    <Booking />
    </div>
  );
}

export default App;
