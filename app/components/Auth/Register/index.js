import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../styles';

class Register extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div id="login-form">
        <div style={styles.boxContainer}>
          <Paper style={styles.paper}>
            <div>
              <div style={styles.title}>
                مستخدم جديد
              </div>
              <div style={styles.logoSmallContainer}>
                <img src="http://adminwebtemplates.com/logo-small.png" alt="Fortress Admin Templat" />
              </div>
            </div>
            <hr />
            <form>
              <TextField
                hintText="الاسم بالكامل"
                floatingLabelText="الاسم"
                fullWidth
                value={this.props.fullName}
                onChange={this.props.onFullNameChange}
              />
              <TextField
                hintText="عنوان البريد الالكتروني"
                floatingLabelText="البريد الالكتروني"
                fullWidth
                value={this.props.email}
                onChange={this.props.onEmailChange}
              />
              <TextField
                hintText="كلمة المرور"
                floatingLabelText="كلمة المرور"
                fullWidth
                type="password"
                value={this.props.password}
                onChange={this.props.onPasswordChange}
              />
              <TextField
                hintText="تأكيد كلمة المرور"
                floatingLabelText="تأكيد كلمة المرور"
                fullWidth
                type="password"
                value={this.props.confirmPassword}
                onChange={this.props.onConfirmPasswordChange}
              />

              <div style={styles.buttonsContainer}>
                <RaisedButton
                  label="الى الخلف"
                  style={styles.goBackBtn}
                  onClick={this.props.onGoBack}
                />

                <RaisedButton
                  label="ادخال مستخدم جديد"
                  primary
                  style={styles.boxBtn}
                  onClick={this.props.onRegister}
                />
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  fullName: PropTypes.string.isRequired,
  onFullNameChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onConfirmPasswordChange: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default Register;
