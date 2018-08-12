/**
*
* PaymentModal
*
*/

import React from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      total: { currency: props.currency, value: '18.0' },
      cashPayment: { currency: props.currency, value: '10.0' },
      cardPayment: { currency: props.currency, value: '8.0' },
      remainder: { currency: props.currency, value: '0.0' },
    };
  }

  render() {
    const { handleClose, open, id } = this.props;
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
        onClick={() => { }}
      />,
      < FlatButton
        label="بطاقة"
        primary
        keyboardFocused
        onClick={() => { }}
      />,
      < FlatButton
        label="انهاء"
        primary
        keyboardFocused
        onClick={() => window.print() && this.props.handleClose(true)}
      />,
    ];

    const currencies = data.currencies.map((currency, index) =>
      <MenuItem key={index} value={currency} primaryText={currency} />
    );

    const currenciesSelectField = (value) =>
      (<SelectField
        value={value}
        onChange={this.handleChange}
        floatingLabelText="العملة"
      >
        {currencies}
      </SelectField>);

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
          actionsContainerStyle={{
            textAlign: 'center',
            button: {
              minWidth: '25%',
            },
          }}
        >
          <div className={'row'}>
            <Paper className={'col-xs-4 col-md-4 col-lg-4'}>
              <CartList data={this.props.data} style={{ marginTop: '0px', maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden', paddingTop: 0 }} />
            </Paper>
            <Paper className={'col-xs-8 col-md-8 col-lg-8'} style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' }}>
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-4 col-md-4'}>المبلغ</div>
                  <div className={'col-lg-5 text-center  payment-value col-xs-5  col-md-5'}>
                    <div>
                      <TextField
                        id="text-field-controlled"
                        value={this.state.total.value}
                        onChange={this.handleChange}
                        disabled
                        style={styles.paymentValueInput}
                        className={'text-center'}
                      />
                    </div>
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>
                    {currenciesSelectField(this.state.total.currency)}
                  </div>

                </div>
              </Subheader>
              <Divider />
              <Subheader className="screen payment " style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-2 col-md-2'}>بطاقة</div>
                  <div className={'col-lg-5 text-center selected payment-value col-xs-5  col-md-5'}>
                    <TextField
                      id="text-field-controlled"
                      value={this.state.cardPayment.value}
                      onChange={this.handleChange}
                      className={'text-center'}
                      style={styles.paymentValueInput}
                      underlineDisabledStyle
                    />
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>{currenciesSelectField(this.state.cashPayment.currency)} </div>

                </div>
              </Subheader>
              <Divider offset />
              <Subheader className="screen payment" style={styles.clearHeader}>
                <div className={'row'}>
                  <div className={'col-lg-2 col-xs-2 col-md-2'}>كاش</div>
                  <div className={'col-lg-5 text-center  payment-value col-xs-5  col-md-5'}>
                    <TextField
                      id="text-field-controlled"
                      value={this.state.cashPayment.value}
                      onChange={this.handleChange}
                      style={styles.paymentValueInput}
                      className={'text-center'}
                      underlineDisabledStyle
                    />
                  </div>
                  <div className={'col-lg-4 col-xs-4 col-md-4'}>{currenciesSelectField(this.state.cardPayment.currency)} </div>

                </div>
              </Subheader>
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

        <InvoiceReport />
      </div >
    );
  }
}

PaymentModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  currency: PropTypes.string,
  data: PropTypes.array,
};

export default PaymentModal;
