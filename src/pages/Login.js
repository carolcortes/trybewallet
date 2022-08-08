import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      invalidPassword: true,
      invalidEmail: true,
    };
  }

  onPasswordChange = ({ target }) => {
    const MIN_PASSWORD_LENGTH = 6;
    const invalidPassword = target.value.length < MIN_PASSWORD_LENGTH;
    this.setState({ invalidPassword });
  }

  onEmailChange = ({ target }) => {
    const regex = /^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({
      invalidEmail: !target.value.match(regex),
      email: target.value,
    });
  }

  onBtnClick = () => {
    const { getEmail, history } = this.props;
    const { email } = this.state;

    getEmail(email);
    history.push('/carteira');
  }

  render() {
    const { invalidPassword, invalidEmail, email } = this.state;
    return (
      <div>
        <h1 className="header">TrybeWallet</h1>
        <form onSubmit={ this.onBtnClick } className="login-form">
          <h3 className="login">LOGIN</h3>
          <input
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ this.onEmailChange }
            value={ email }
            className="login-input"
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.onPasswordChange }
            className="login-input"
          />
          <button
            type="button"
            onClick={ this.onBtnClick }
            disabled={ invalidEmail ? true : invalidPassword }
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  getEmail: PropTypes.func,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
