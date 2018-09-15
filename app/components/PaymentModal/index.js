/**
*
* PaymentModal
*
*/

import React, { Fragment } from 'react';
// import styled from 'styled-components';
import FontIcon from 'material-ui/FontIcon';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { cyan600, white, black } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
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
  [<FontIcon className="material-icons" >backspace</FontIcon>],
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
    if ((state.remainder.value === undefined)) {
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
      total: { currency: props.currency, value: '18.0' },
      cashPayment: { currency: props.currency, value: '10.0' },
      cardPayment: { currency: props.currency, value: '8.0' },
      payments: [], // has value type currency
      remainder: { currency: props.currency, value: undefined },
    };
    this.addCashPayment = this.addCashPayment.bind(this);
    this.addCardPayment = this.addCardPayment.bind(this);
    this.addPaymentRow = this.addPaymentRow.bind(this);
    this.handlePaymentValueChange = this.handlePaymentValueChange.bind(this);
  }

  handlePaymentValueChange(event, index) {
    const { remainder, payments } = this.state;
    const { total } = this.props.data;
    const newPayments = payments.map((v, i) => (i === index) ? { ...v, value: parseFloat(event.target.value) } : v);
    console.log(newPayments);
    const theRest = newPayments.reduce((rem, payment) => rem - payment.value, total);
    console.log('the rest', theRest, parseFloat(remainder.value));
    this.setState({ payments: newPayments, remainder: { ...remainder, value: theRest } }, (val) => console.log('done mutating', this.state));
  }

  addPaymentRow(type) {
    this.setState({ payments: [...this.state.payments, { type, currency: this.props.currency, value: this.state.remainder.value }] });
  }
  addCashPayment() {
    this.addPaymentRow('cash');
  }
  addCardPayment() {
    this.addPaymentRow('card');
  }
  render() {
    const { handleClose, open, id, removeProduct, currency } = this.props;
    const actions = [
      <FlatButton
        label="الغاء"
        primary
        onClick={() => this.props.handleClose(false)}
      />,
      < FlatButton
        label="كاش"
        primary
        keyboardFocused
        onClick={this.addCashPayment}
      />,
      < FlatButton
        label="بطاقة"
        primary
        keyboardFocused
        onClick={this.addCardPayment}
      />,
      < FlatButton
        label={'انهاء'}
        primary
        disabled={!!this.state.remainder.value}
        keyboardFocused
        onClick={() => window.print() && this.props.handleClose(true)}
      />,
    ];

    const currencies = data.currencies.map((curr, index) =>
      <MenuItem key={index} value={curr} primaryText={curr} />
    );

    const currenciesSelectField = (value) =>
      (<SelectField
        value={value}
        onChange={this.handleChange}
        floatingLabelText="العملة"
      >
        {currencies}
      </SelectField>);
    console.log(this.props);
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
              <CartList removeProduct={removeProduct} data={this.props.data} style={{ marginTop: '0px', maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', paddingTop: 0 }} />
            </Paper>
            <Paper className={'col-xs-8 col-md-8 col-lg-8'} style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-4 col-md-4'}>المبلغ</div>
                  <div className={'col-lg-5 text-center  payment-value col-xs-5  col-md-5'}>
                    <div>
                      <TextField
                        id="text-field-controlled"
                        value={this.props.data.total}
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
              {
                this.state.payments.map((payment, index) => (
                  <Fragment key={`${index}_${payment.type}`}>
                    <Subheader className="screen payment " style={styles.clearHeader}>
                      <div className={'row'}>
                        <div className={'col-lg-2 col-xs-2 col-md-2'}>{payment.type === 'cash' ? 'كاش' : 'بطاقة'}</div>
                        <div className={'col-lg-5 text-center selected payment-value col-xs-5  col-md-5'}>
                          <TextField
                            id="text-field-controlled"
                            defaultValue={payment.value}
                            onBlur={(e) => this.handlePaymentValueChange(e, index)}
                            className={'text-center'}
                            type={'number'}
                            step={0.1}
                            style={styles.paymentValueInput}
                            underlineDisabledStyle
                          />
                        </div>
                        <div className={'col-lg-4 col-xs-4 col-md-4'}>{currenciesSelectField(this.state.cashPayment.currency)} </div>

                      </div>
                    </Subheader>
                    <Divider offset />

                  </Fragment>
                ))
              }

              <Divider />
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-2 col-md-2'}>الباقي</div>
                  <div className={'col-lg-5 text-center selected payment-value col-xs-5  col-md-5'}>
                    <TextField
                      id="text-field-controlled"
                      value={this.state.remainder.value}
                      onChange={this.handleChange}
                      disabled
                      style={styles.paymentValueInput}
                      className={'text-center'}
                      underlineDisabledStyle
                    />
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>{currenciesSelectField(this.state.remainder.currency)} </div>

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

        <InvoiceReport data={this.props.data} payments={this.state.payments} user={this.props.user} />
      </div >
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
};

export default PaymentModal;
