import React from 'react';
import AppRoutes from './Routes/Routes';
import { AuthProvider } from './providers/AuthContext';
import './index.css';
import FormularioReserva from './components/formulario_reserva/FormularioReserva';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
