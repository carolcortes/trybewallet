import React from 'react';
import { screen, waitFor } from '@testing-library/react'
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Testes do componente Table', () => {
  it('A tabela possui um header com a descrição das informações inseridas no formulário, de câmbio e os botões de editar e excluir despesa', () => {
    renderWithRouterAndRedux(<Wallet />);

    const thDescription = screen.getByRole('columnheader', { name: /Descrição/i });
    const thTag = screen.getByRole('columnheader', { name: /Tag/i });
    const thMethod = screen.getByRole('columnheader', { name: /Método/i });
    const thValue = screen.getByRole('columnheader', { name: 'Valor' });
    const thCurrency = screen.getByRole('columnheader', { name: 'Moeda' });
    const thExchangeRate = screen.getByRole('columnheader', { name: /Câmbio/i });
    const thConvertedValue = screen.getByRole('columnheader', { name: /Convertido/i });
    const thConversionCurrency = screen.getByRole('columnheader', { name: /Moeda de Conversão/i });
    const thButton = screen.getByRole('columnheader', { name: 'Editar/Excluir' });

    expect(thDescription).toBeDefined();
    expect(thTag).toBeDefined();
    expect(thMethod).toBeDefined();
    expect(thValue).toBeDefined();
    expect(thCurrency).toBeDefined();
    expect(thExchangeRate).toBeDefined();
    expect(thConvertedValue).toBeDefined();
    expect(thConversionCurrency).toBeDefined();
    expect(thButton).toBeDefined();
  });

  it('As informações da despesa são adicionadas e excluídas corretamente na tabela', async () => {
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

    const tdDescription = screen.getByRole('cell', { name: /Gastos/i });
    const tdTag = screen.getByRole('cell', { name: /Transporte/i });
    const tdMethod = screen.getByRole('cell', { name: /Dinheiro/i });
    const tdValue = screen.getByRole('cell', { name: /2.00/i });
    const tdCurrency = screen.getByRole('cell', { name: 'Euro/Real Brasileiro' });
    const tdExchangeRate = screen.getByRole('cell', { name: '5.13' });
    const tdConvertedValue = screen.getByRole('cell', { name: '10.25' });
    const tdConversionCurrency = screen.getByRole('cell', { name: /BRL/i });
    const deleteBtn = screen.getByTestId('delete-btn')
    const editBtn = screen.getByTestId('edit-btn')

    const allCells = [tdDescription, tdTag, tdMethod, tdValue, tdCurrency, 
      tdExchangeRate, tdConvertedValue, tdConversionCurrency, deleteBtn, editBtn]

    allCells.forEach((cell) => {
      expect(cell).toBeDefined();
    })

    userEvent.click(deleteBtn);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  })
});
