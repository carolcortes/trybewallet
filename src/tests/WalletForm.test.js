import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import WalletForm from '../components/WalletForm';
import userEvent from '@testing-library/user-event';

describe('Testes do componente WalletForm', () => {
  const currencies = Object.keys(mockData).filter((currency) => currency !== 'USDT')

  it('O componente possui os campos de valor, descrição, moeda, forma de pagamento e Tag', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getAllByTestId('tag-input');

    expect(valueInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(currencyInput).toBeDefined();
    expect(methodInput).toBeDefined();
    expect(tagInput).toBeDefined();
  });

  it('No formulário contém as opções corretas de moeda, métodos e tags', () => {
    const initialState = {
      wallet: {
        currencies,
      }
    }

    renderWithRouterAndRedux(<WalletForm />, { initialState });
    const currencyOption = screen.getAllByTestId('currency-option');
    const methodOption = screen.getAllByTestId('method-option');
    const tagOption = screen.getAllByTestId('tag-option');
    
    expect(currencyOption).toHaveLength(15);
    expect(methodOption).toHaveLength(3);
    expect(tagOption).toHaveLength(5)

    expect(currencyOption[0]).toHaveTextContent('USD')
    expect(methodOption[0]).toHaveTextContent('Dinheiro')
    expect(methodOption[1]).toHaveTextContent('Cartão de crédito')
    expect(tagOption[0]).toHaveTextContent('Alimentação')
    expect(tagOption[4]).toHaveTextContent('Saúde')
  })

  it('A despesa criada é salva no estado do Redux', async () => {
    const initialState = {
      wallet: {
        currencies: [],
        expenses: [],
      }
    }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    })

    const { store } = renderWithRouterAndRedux(<Wallet />, { initialState })
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpenseBtn = screen.getByRole('button', { name: /Adicionar despesa/i })

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'Gastos');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.click(addExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(valueInput.value).toBe('');
    expect(descriptionInput.value).toBe('')

    const { wallet } = store.getState();
    expect(wallet.expenses).toHaveLength(1)
  })

  it('As informações podem ser editadas no formulário', async () => {
    const initialState = {
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

    const editBtn = screen.getByTestId('edit-btn');
    expect(editBtn).toBeDefined();
    userEvent.click(editBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const EditExpenseBtn = screen.getByRole('button', { name: /Editar despesa/ })

    userEvent.type(valueInput, 'Outros Gastos');
    userEvent.click(EditExpenseBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  })
})
