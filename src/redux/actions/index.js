import getAllCurrencies from '../../services/currenciesAPI';
import { USER_EMAIL, GET_CURRENCIES,
  ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE } from './actionTypes';

export const userEmail = (email) => ({ type: USER_EMAIL, email });

export const walletCurrencies = () => async (dispatch) => {
  const response = await getAllCurrencies();
  const currencies = Object.keys(response);
  dispatch({ type: GET_CURRENCIES, currencies });
};

export const userExpenses = (expense) => async (dispatch) => {
  const response = await getAllCurrencies();
  const exchangeRates = response;
  expense.exchangeRates = exchangeRates;
  dispatch({ type: ADD_EXPENSE, expense });
};

export const deleteExpense = (id) => ({ type: DELETE_EXPENSE, id });

export const editExpense = (id) => ({ type: EDIT_EXPENSE, id });
