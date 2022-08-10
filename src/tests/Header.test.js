import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

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

  it('O email do usuário e o total de despesas é renderizado corretamente no componente', async () => {
    const initialState = { 
      user: {
        email: 'test@test.com',
      },
      wallet: {
        currencies: [],
        expenses: [],
      }
    }
    
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
     });
    
    renderWithRouterAndRedux(<Wallet />, { initialState })
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const userEmail = screen.getByTestId('email-field');
    const totalExpenses = screen.getByTestId('total-field');

    expect(userEmail).toHaveTextContent('test@test.com');
    expect(totalExpenses).toHaveTextContent('0.00');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/ })

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Gastos');
    userEvent.selectOptions(currencyInput, 'EUR');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Transporte');
    userEvent.click(addExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(totalExpenses).toHaveTextContent('10.25')
  })
})

