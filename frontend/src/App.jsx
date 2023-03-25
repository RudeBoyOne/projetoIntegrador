import React from 'react';
import AppRoutes from './Routes/Routes';
import './index.css';
import { AuthProvider } from './providers/AuthContext';

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
