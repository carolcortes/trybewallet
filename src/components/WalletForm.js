import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesAPI } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <input type="number" data-testid="value-input" step="0.01" placeholder="0,00" />
          <input type="text" data-testid="description-input" placeholder="Descrição" />
          <select data-testid="currency-input">
            { currencies.map((currencie) => (
              <option key={ currencie }>{ currencie }</option>
            ))}
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: PropTypes.func,
  currencies: PropTypes.string,
  filter: PropTypes.func,
}.isRequired;

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrenciesAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
