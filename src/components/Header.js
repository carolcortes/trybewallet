import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p>
          Despesa total:
          {' '}
          <span data-testid="total-field">
            0
            {' '}
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps)(Header);
