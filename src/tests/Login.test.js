import React from 'react';
import { screen } from '@testing-library/react'
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes da página da Login', () => {
  it('Na tela inicial, a página de Login contém os campos de e-mail e senha e um botão de entrar', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });
    
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(button).toBeDefined();
  });

  it('O email deve ser informado corretamente e a senha conter, pelo menos, seis dígitos', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });

    expect(button).toBeDisabled();
    userEvent.type(emailInput, 'test@test.com');
    expect(button).toBeDisabled();

    userEvent.type(passwordInput, '123456');
    expect(button).not.toBeDisabled();

    userEvent.type(emailInput, 'test');
    userEvent.type(passwordInput, '12345');
    expect(button).toBeDisabled();
  });

  it('Ao inserir as informações corretas e clicar no botão de entrar, a página é redirecionada para o path "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);

    const { location } = history;
    expect(location.pathname).toBe('/carteira')

  })
})