import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userExpenses, walletCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpensesBtn = () => {
    const { addExpense, expenses } = this.props;
    addExpense({ ...this.state, id: expenses.length });
    this.setState({ value: '', description: '' });
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div>
        <form onSubmit={ this.addExpensesBtn }>
          <input
            type="number"
            name="value"
            data-testid="value-input"
            step="0.01"
            placeholder="0,00"
            onChange={ this.onInputChange }
            value={ value }
          />
          <input
            type="text"
            name="description"
            data-testid="description-input"
            placeholder="Descrição"
            onChange={ this.onInputChange }
            value={ description }
          />
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.onInputChange }
          >
            { currencies.map((currencie) => (
              <option key={ currencie }>{ currencie }</option>
            ))}
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.onInputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.onInputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="button" onClick={ this.addExpensesBtn }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  getCurrencies: PropTypes.func,
  currencies: PropTypes.string,
}.isRequired;

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(walletCurrencies()),
  addExpense: (expense) => dispatch(userExpenses(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
