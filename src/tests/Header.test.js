import React from 'react';
import { screen } from '@testing-library/react'
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testes do componente Header', () => {
  it('O componente Header possui o email do usuário, o total de despesas e a moeda utilizada', () => {
    renderWithRouterAndRedux(<Wallet />);

    const userEmail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(userEmail).toBeDefined();
    expect(totalExpenses).toBeDefined();
    expect(currency).toBeDefined();
  });

  it('O email do usuário e o total de despesas é renderizado corretamente no componente', () => {
    const initialState = { 
      user: {
        email: 'test@test.com',
      },
    }
    
    renderWithRouterAndRedux(<Wallet />, { initialState });
    const userEmail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');

    expect(userEmail).toHaveTextContent('test@test.com');
    expect(totalExpenses).toHaveTextContent('0.00');
  })
})

