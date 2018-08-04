import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../styles';

class ForgotPassword extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      showEmailSentMessage: false,
      message: 'ادخل عنوان البريد الالكتروني الخاص بك حتى تصلك رسالة اعادة تنصيب كلمة المرور',
    };

    this.sentEmail = this.sentEmail.bind(this);
  }

  sentEmail() {
    this.setState({
      showEmailSentMessage: true,
      message: `تفقد صندوق الوارد ${this.props.email} تم ارسال تفاصيل اعادة تنصيب كلمة المرور الى `,
    });
  }

  render() {
    return (
      <div id="login-form">
        <div style={styles.boxContainer}>
          <Paper style={styles.paper}>
            <div>
              <div style={styles.title}>
               نسيت كلمة المرور ؟
              </div>
              <div style={styles.logoSmallContainer}>
                <img src="http://adminwebtemplates.com/logo-small.png" alt="Fortress Admin Template" />
              </div>
            </div>
            <hr />
            <p>{this.state.message}</p>
            <form>
              {
                this.state.showEmailSentMessage ? null :
                (
                  <TextField
                    hintText="عنوان البريد الالكتروني"
                    floatingLabelText="البريد الالكتروني"
                    fullWidth
                    value={this.props.email}
                    onChange={this.props.onEmailChange}
                  />
                )
              }

              <div style={styles.buttonsContainer}>
                <RaisedButton
                  label="الى الخلف"
                  style={styles.goBackBtn}
                  onClick={this.props.onGoBack}
                />

                {
                  this.state.showEmailSentMessage ? null :
                  (
                    <RaisedButton
                      label="ارسال"
                      primary
                      style={styles.boxBtn}
                      onClick={this.sentEmail}
                    />
                  )
                }
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default ForgotPassword;
