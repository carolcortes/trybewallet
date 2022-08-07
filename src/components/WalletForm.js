import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, userExpenses, walletCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: '',
      tag: '',
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
    this.setState({
      value: '', description: '', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação',
    });
  }

  EditExpenseBtn = () => {
    const { expenses, idToEdit, getDeletedExpense, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    console.log(expenses);

    const updatedExpense = {
      value: value || expenses[idToEdit].value,
      description: description || expenses[idToEdit].description,
      exchangeRates: expenses[idToEdit].exchangeRates,
      currency,
      method,
      tag,
      id: idToEdit,
    };

    getDeletedExpense(idToEdit);
    addExpense(updatedExpense);
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;

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
            value={ currency }
          >
            { currencies.map((currencie) => (
              <option
                key={ currencie }
                data-testid="currency-option"
              >
                { currencie }
              </option>
            ))}
          </select>
          <select
            name="method"
            data-testid="method-input"
            onChange={ this.onInputChange }
            value={ method }
          >
            <option data-testid="method-option">Dinheiro</option>
            <option data-testid="method-option">Cartão de crédito</option>
            <option data-testid="method-option">Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.onInputChange }
            value={ tag }
          >
            <option data-testid="tag-option">Alimentação</option>
            <option data-testid="tag-option">Lazer</option>
            <option data-testid="tag-option">Trabalho</option>
            <option data-testid="tag-option">Transporte</option>
            <option data-testid="tag-option">Saúde</option>
          </select>
          <button
            type="button"
            onClick={ editor ? this.EditExpenseBtn : this.addExpensesBtn }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
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
  idToEdit: store.wallet.idToEdit,
  editor: store.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(walletCurrencies()),
  addExpense: (expense) => dispatch(userExpenses(expense)),
  getDeletedExpense: (id) => dispatch(deleteExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
