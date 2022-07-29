import getAllCurrencies from '../../services/currenciesAPI';
import { USER_EMAIL, GET_CURRENCIES } from './actionTypes';

export const userEmail = (email) => ({ type: USER_EMAIL, email });

export const walletCurrencies = (currencies) => ({ type: GET_CURRENCIES, currencies });

export const fetchCurrenciesAPI = () => async (dispatch) => {
  const response = await getAllCurrencies();
  const currencies = Object.keys(response).filter((currencie) => currencie !== 'USDT');
  dispatch(walletCurrencies(currencies));
};
