import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, { value, currency, exchangeRates }) => (
      acc + Number(value) * Number(exchangeRates[currency].ask)), 0);
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p>
          Despesa total:
          {' '}
          <span data-testid="total-field">
            { (expenses.length ? totalExpenses : 0).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
