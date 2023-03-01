import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginPage from './Login';

// Cria um teste com o Jest
test('usuário pode fazer login com sucesso', async () => {

    // Renderiza a tela de login
    const { getByLabelText, getByText } = render(<LoginPage />);
    
    // Encontra os elementos da tela
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Senha');
    const loginButton = getByText('Enviar');
    
    // Simula a entrada de dados do usuário
fireEvent.change(emailInput, { target: { value: 'joao@gmail.com' } });
fireEvent.change(passwordInput, { target: { value: '1234567' } });

// Simula o clique no botão de login
fireEvent.click(loginButton);

// Aguarda as atualizações do DOM
await act(async () => {});

// Verifica se a página inicial foi exibida
expect(getByText('Pesquise por Categoria')).toBeInTheDocument();
});