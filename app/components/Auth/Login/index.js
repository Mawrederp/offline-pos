import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { injectIntl } from 'react-intl';
import styles from '../styles';
import messages from '../messages';

class Login extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  render() {
    console.log(this.props);
    const {
      emailHint,
      emailText,
      passwordHint,
      passwordText,
      rememberMeText,
      signInText,
      forgotPasswordText,
      newAccountText,
    } = messages;
    const { intl } = this.props;
    return (
      <div id="login-form">
        <div style={styles.boxContainer}>
          <Paper style={styles.paper}>
            <div style={styles.logoContainer}>
              <img
                style={{ width: 295, height: 54 }}
                src="http://via.placeholder.com/295x54" alt="Offline Point Of Sale"
              />
            </div>
            {
              this.props.errorMessage ? (
                <div>
                  <p style={styles.errorMessage}>
                    * {this.props.errorMessage}
                  </p>
                </div>
              ) : null
            }

            <form>
              <TextField
                hintText={intl.formatMessage(emailHint)}
                floatingLabelText={intl.formatMessage(emailText)}
                fullWidth
                value={this.props.email}
                onChange={this.props.onEmailChange}
              />
              <TextField
                hintText={intl.formatMessage(passwordHint)}
                floatingLabelText={intl.formatMessage(passwordText)}
                fullWidth
                type="password"
                value={this.props.password}
                onChange={this.props.onPasswordChange}
              />

              <div style={styles.buttonsContainer}>
                <Checkbox
                  label={intl.formatMessage(rememberMeText)}
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  checked={this.props.rememberMe}
                  onCheck={this.props.onRememberMeChange}
                />

                <RaisedButton
                  label={intl.formatMessage(signInText)}
                  primary
                  style={styles.boxBtn}
                  onClick={this.props.onSignIn}
                />

              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label={intl.formatMessage(forgotPasswordText)}
              onClick={this.props.onForgotPassword}
              style={styles.flatButton}
              icon={<FontIcon className="material-icons">help</FontIcon>}
            />
            <FlatButton
              label={intl.formatMessage(newAccountText)}
              onClick={this.props.onRegister}
              style={styles.flatButton}
              icon={<FontIcon className="material-icons">person_add</FontIcon>}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  rememberMe: PropTypes.any.isRequired,
  onRememberMeChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  intl: PropTypes.any,
};

export default injectIntl(Login);
