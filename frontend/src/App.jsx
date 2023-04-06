import React from 'react';
import AppRoutes from './Routes/Routes';
import { AuthProvider } from './providers/AuthContext';
import { ProductProvider } from './providers/ProductContext';
import { CidadeProvider } from './providers/CidadeContext';
import './index.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ProductProvider>
          <CidadeProvider>
            <AppRoutes />
          </CidadeProvider>
        </ProductProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
