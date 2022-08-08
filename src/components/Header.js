import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUserAlt, FaWallet } from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, { value, currency, exchangeRates }) => (
      acc + Number(value) * Number(exchangeRates[currency].ask)), 0);
    return (
      <div className="wallet-header">
        <h1>
          <FaWallet />
          { ' ' }
          TrybeWallet
        </h1>
        <p data-testid="email-field">
          <FaUserAlt />
          {' '}
          { email }
        </p>
        <p className="total-expense">
          Despesa total:
          {' '}
          <span data-testid="total-field">
            { (expenses.length ? totalExpenses : 0).toFixed(2) }
            {' '}
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
