/**
 *
 * PaymentModal
 *
 */

import React, { Fragment } from 'react';
// import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { cyan600, white, black } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import { Print } from 'react-easy-print';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import InvoiceReport from '../InvoiceReport';
import ButtonSet from '../ButtonSet';
import messages from './messages';
import data from '../../data';
import CartList from '../CartList';

const mainButtons = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', 'C'],
];

const sideButtons = [
  ['+10'],
  ['+20'],
  ['+50'],
  [<FontIcon className="material-icons">backspace</FontIcon>],
];
const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white,
    lineHeight: '34px',
    hover: {
      background: '#eee',
    },
  },
  clearHeader: {
    fontWeight: typography.fontWeightMedium,
    backgroundColor: white,
    color: black,
  },
  paymentValueInput: {
    fontSize: '2.4em',
  },
};

class PaymentModal extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (
      state.remainder.value === undefined ||
      state.remainder.value > props.data.total
    ) {
      return { remainder: { ...state.remainder, value: props.data.total } };
    }
    if (!props.open) {
      return {
        total: { currency: props.currency, value: '18.0' },
        cashPayment: { currency: props.currency, value: '10.0' },
        cardPayment: { currency: props.currency, value: '8.0' },
        payments: [], // has value type currency
        remainder: { currency: props.currency, value: undefined },
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      total: { currency: props.currency, value: '0.0' },
      cashPayment: { currency: props.currency, value: '0.0' },
      cardPayment: { currency: props.currency, value: '0.0' },
      payments: [], // has value type currency
      remainder: { currency: props.currency, value: undefined },
    };
    this.addCashPayment = this.addCashPayment.bind(this);
    this.addCardPayment = this.addCardPayment.bind(this);
    this.addPaymentRow = this.addPaymentRow.bind(this);
    this.handlePaymentValueChange = this.handlePaymentValueChange.bind(this);
    this.concludePayment = this.concludePayment.bind(this);
  }

  handlePaymentValueChange(event, index) {
    const { remainder, payments } = this.state;
    const { total } = this.props.data;
    const newPayments = payments.map((v, i) =>
      i === index ? { ...v, value: parseFloat(event.target.value) } : v
    );
    const theRest = newPayments.reduce(
      (rem, payment) => rem - payment.value,
      total
    );
    this.setState({
      payments: newPayments,
      remainder: { ...remainder, value: theRest },
    });
  }

  addPaymentRow(type) {
    if (this.state.remainder.value !== 0) {
      this.setState({
        payments: [
          ...this.state.payments,
          {
            type,
            currency: this.props.currency,
            value: this.state.remainder.value,
          },
        ],
        remainder: { ...this.state.remainder, value: 0 },
      });
    }
  }

  addCashPayment() {
    this.addPaymentRow('cash');
  }

  addCardPayment() {
    this.addPaymentRow('card');
  }
  concludePayment(status) {
    const { total, cashPayment, cardPayment, payments } = this.state;
    const endResult = {
      total,
      cashPayment,
      cardPayment,
      remainder: this.state.remainder,
    };

    this.props.handleClose(
      status,
      status
        ? {
          endResult,
          payments,
          cart: this.props.data,
          user: this.props.user,
        }
        : null
    );
  }
  render() {
    const { handleClose, open, id, removeProduct, currency, intl } = this.props;
    const { total, cashPayment, cardPayment } = this.state;
    const endResult = {
      total,
      cashPayment,
      cardPayment,
      remainder: this.state.remainder,
    };
    const { finish, cancel, cash, amount, card, remainder } = messages;
    const actions = [
      <FlatButton
        label={intl.formatMessage(cancel)}
        primary
        onClick={() => this.concludePayment(false)}
      />,
      <FlatButton
        label={intl.formatMessage(cash)}
        primary
        keyboardFocused
        onClick={this.addCashPayment}
      />,
      <FlatButton
        label={intl.formatMessage(card)}
        primary
        keyboardFocused
        onClick={this.addCardPayment}
      />,
      <FlatButton
        label={intl.formatMessage(finish)}
        primary
        disabled={!(this.state.remainder.value <= 0)}
        keyboardFocused
        onClick={() => {
          this.concludePayment(true);
        }}
      />,
    ];

    const currencies = data.currencies.map((curr, index) => (
      <MenuItem key={index} value={curr} primaryText={curr} />
    ));

    const currenciesSelectField = (value) => (
      <SelectField
        value={value}
        onChange={this.handleChange}
        floatingLabelText={intl.formatMessage(messages.currency)}
      >
        {currencies}
      </SelectField>
    );
    return (
      <div>
        <Dialog
          actions={actions}
          modal
          open={open}
          onRequestClose={handleClose}
          container={() => document.getElementById(id)}
          overlayStyle={{ display: 'none' }}
          contentStyle={{ maxWidth: 'none' }}
          autoScrollBodyContent
          actionsContainerStyle={{
            textAlign: 'center',
            button: {
              minWidth: '25%',
            },
          }}
        >
          <div className={'row'}>
            <Paper className={'col-xs-4 col-md-4 col-lg-4'}>
              <CartList
                removeProduct={removeProduct}
                data={this.props.data}
                style={{
                  marginTop: '0px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingTop: 0,
                }}
              />
            </Paper>
            <Paper
              className={'col-xs-8 col-md-8 col-lg-8'}
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-4 col-md-4'}>
                    {intl.formatMessage(amount)}
                  </div>
                  <div
                    className={
                      'col-lg-5 text-center  payment-value col-xs-5  col-md-5'
                    }
                  >
                    <div>
                      <TextField
                        id="text-field-controlled"
                        value={parseFloat(this.props.data.total).toFixed(2)}
                        disabled
                        style={styles.paymentValueInput}
                        className={'text-center'}
                      />
                    </div>
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>
                    {currenciesSelectField(currency)}
                  </div>
                </div>
              </Subheader>
              <Divider />
              {this.state.payments.map((payment, index) => (
                <Fragment key={`${index}_${payment.type}`}>
                  <Subheader
                    className="screen payment "
                    style={styles.clearHeader}
                  >
                    <div className={'row'}>
                      <div className={'col-lg-2 col-xs-2 col-md-2'}>
                        {payment.type === 'cash' ? 'كاش' : 'بطاقة'}
                      </div>
                      <div
                        className={
                          'col-lg-5 text-center selected payment-value col-xs-5  col-md-5'
                        }
                      >
                        <TextField
                          id="text-field-controlled"
                          defaultValue={payment.value}
                          onBlur={(e) =>
                            this.handlePaymentValueChange(e, index)
                          }
                          className={'text-center'}
                          type={'number'}
                          step={0.1}
                          style={styles.paymentValueInput}
                          underlineDisabledStyle={{}}
                        />
                      </div>
                      <div className={'col-lg-4 col-xs-4 col-md-4'}>
                        {currenciesSelectField(this.state.cashPayment.currency)}{' '}
                      </div>
                    </div>
                  </Subheader>
                  <Divider offset={'true'} />
                </Fragment>
              ))}

              <Divider />
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-2 col-md-2'}>
                    {intl.formatMessage(remainder)}
                  </div>
                  <div
                    className={
                      'col-lg-5 text-center selected payment-value col-xs-5  col-md-5'
                    }
                  >
                    <TextField
                      id="text-field-controlled"
                      value={parseFloat(this.state.remainder.value).toFixed(2)}
                      onChange={this.handleChange}
                      disabled
                      style={styles.paymentValueInput}
                      className={'text-center'}
                      underlineDisabledStyle={{}}
                    />
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>
                    {currenciesSelectField(this.state.remainder.currency)}{' '}
                  </div>
                </div>
              </Subheader>
            </Paper>
            <div className="buttons">
              <ButtonSet
                buttons={sideButtons}
                pressHandler={(label) => this.buttonPressHandler(label)}
                className="sideButtonMatrix"
              />
              <ButtonSet
                buttons={mainButtons}
                pressHandler={(label) => this.buttonPressHandler(label)}
                className="mainButtonMatrix"
              />
            </div>
          </div>
        </Dialog>
        <Print printOnly single name="invoice-report">
          <InvoiceReport
            data={this.props.data}
            endResult={endResult}
            payments={this.state.payments}
            user={this.props.user}
            printOnly
          />
        </Print>
      </div>
    );
  }
}

PaymentModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  currency: PropTypes.string,
  data: PropTypes.any,
  removeProduct: PropTypes.func,
  user: PropTypes.any,
  intl: PropTypes.any,
};

export default injectIntl(PaymentModal);
