/**
*
* ProductForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Paper, Subheader, FlatButton, TextField, Toggle } from 'material-ui';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
// pick utils
import MomentUtils from '@date-io/moment';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { injectIntl } from 'react-intl';
import DateTimeLabel from '../DateTimeLabel';
import messages from './messages';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


class ProductForm extends React.PureComponent {

  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDateTime: new Date('2018-01-01T00:00:00.000Z'),
      selectedEndDateTime: new Date('2018-01-01T00:00:00.000Z'),
      clearedDate: null,
      imageUpload: false,
      discountIsTimed: props.product.discountFrom,
    };

    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.discountTimeToggle = this.discountTimeToggle.bind(this);
    this.uploadImageToggle = this.uploadImageToggle.bind(this);
  }
  handleDateChange = (date, start) => {
    this.setState({ [start ? 'selectedStartDateTime' : 'selectedEndDateTime']: date });
  };

  // handleClearedDateChange = (date) => {
  //   this.setState({ clearedDate: date });
  // }
  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  discountTimeToggle = (event, toggled) => {
    this.setState({ discountIsTimed: toggled });
  };

  uploadImageToggle = (event, toggled) => {
    this.setState({ imageUpload: toggled });
  };

  // handleSubmit(evt) {
  //   evt.preventDefault();
  //   const data = new FormData(document.getElementById('products-form'));
  //   const dataObj = {};
  //
  //   data.forEach((value, key) => {
  //     dataObj[key] = value;
  //   });
  // }
  render() {
    const { selectedStartDateTime, selectedEndDateTime } = this.state;
    const { product, intl } = this.props;
    const {
      add,
      edit,
      theProduct,
      newProduct,
      time,
      EmployeeName,
      name,
      productName,
      unitPrice,
      theUnit,
      price,
      tax,
      barcode,
      vendor,
      discount,
      quantity,
      timed,
      from,
      to,
      image,
      attach,
      choose,
     } = messages;
    const imgMessageHint = intl.formatMessage(image);
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Paper>
          <Subheader className={'text-center'}>{Object.keys(product).length ? `${intl.formatMessage(edit)} ${intl.formatMessage(theProduct)}` : `${intl.formatMessage(add)} ${intl.formatMessage(newProduct)}`}</Subheader>
          <Table allRowsSelected={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>{intl.formatMessage(time)}: <DateTimeLabel /></TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
                <TableHeaderColumn>{intl.formatMessage(EmployeeName)}: {this.props.user.fullName}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
              <TableRow>
                <TableHeaderColumn><TextField defaultValue={product.name} name={'name'} floatingLabelText={intl.formatMessage(productName, { name: intl.formatMessage(name), product: intl.formatMessage(messages.product) })} /></TableHeaderColumn>
                <TableHeaderColumn><TextField defaultValue={product.price} name={'price'} floatingLabelText={intl.formatMessage(unitPrice, { theUnit: intl.formatMessage(theUnit), price: intl.formatMessage(price) })} step={0.1} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <TextField defaultValue={product.supplier} name={'supplier'} floatingLabelText={intl.formatMessage(vendor)} />
                  {/* <AutoComplete*/}
                  {/* hintText="يمكنك البحث باستخدام احرف او كلمات"*/}
                  {/* dataSource={colors}*/}
                  {/* onUpdateInput={this.handleUpdateInput}*/}
                  {/* floatingLabelText="المورد "*/}
                  {/* filter={AutoComplete.fuzzyFilter}*/}
                  {/* fullWidth*/}
                  {/* name={'supplier'}*/}
                  {/* openOnFocus*/}
                  {/* />*/}
                </TableHeaderColumn>
                <TableHeaderColumn><TextField defaultValue={product.barcode} name={'barcode'} floatingLabelText={intl.formatMessage(barcode)} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <TextField defaultValue={product.tax} name={'tax'} floatingLabelText={intl.formatMessage(tax)} step={0.1} type={'number'} />
                  {/* <AutoComplete*/}
                  {/* hintText="يمكنك البحث باستخدام احرف او كلمات"*/}
                  {/* dataSource={colors}*/}
                  {/* onUpdateInput={this.handleUpdateInput}*/}
                  {/* floatingLabelText="الضريبة "*/}
                  {/* filter={AutoComplete.fuzzyFilter}*/}
                  {/* fullWidth*/}
                  {/* openOnFocus*/}
                  {/* name={'tax'}*/}
                  {/* />*/}
                </TableHeaderColumn>
                <TableHeaderColumn><TextField defaultValue={product.quantity} name={'quantity'} floatingLabelText={intl.formatMessage(quantity)} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn><TextField defaultValue={product.discount} name={'discount'} floatingLabelText={intl.formatMessage(discount)} type={'number'} step={0.1} /></TableHeaderColumn>
                <TableHeaderColumn>
                  <Toggle
                    label={intl.formatMessage(timed, { action: intl.formatMessage(discount) })}
                    style={{ width: '75%' }}
                    defaultToggled={!!this.state.discountIsTimed}
                    onToggle={this.discountTimeToggle}
                  />
                </TableHeaderColumn>


              </TableRow>
              <TableRow>
                <TableHeaderColumn>

                  <div className={'picker'} >
                    {this.state.discountIsTimed ? <input name={'discountFrom'} defaultValue={product.discountFrom || undefined} value={this.state.selectedStartDateTime} type={'hidden'} /> : ''}

                    <DateTimePicker
                      keyboard
                      label={intl.formatMessage(from)}
                      disabled={!this.state.discountIsTimed}
                      onError={(err) => err}
                      minDate={new Date('2018-01-01T00:00')}
                      value={selectedStartDateTime}
                      onChange={(date) => this.handleDateChange(date, true)}
                      format="YYYY/MM/DD hh:mm A"
                      disableOpenOnEnter
                      mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                    />
                  </div>
                </TableHeaderColumn>
                <TableHeaderColumn>

                  <div className="picker ">
                    {this.state.discountIsTimed ? <input name={'discountTo'} defaultValue={product.discountTo || undefined} value={this.state.selectedEndDateTime} type={'hidden'} /> : ''}
                    <DateTimePicker
                      keyboard
                      label={intl.formatMessage(to)}
                      disabled={!this.state.discountIsTimed}
                      onError={(err) => err}
                      minDate={new Date('2018-01-01T00:00')}
                      value={selectedEndDateTime}
                      onChange={this.handleDateChange}
                      format="YYYY/MM/DD hh:mm A"
                      disableOpenOnEnter
                      mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
                    />
                  </div>
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>
                  <Toggle
                    label={intl.formatMessage(attach, { thing: imgMessageHint })}
                    style={{ width: '75%' }}
                    defaultToggled={!!this.state.imageUpload}
                    onToggle={this.uploadImageToggle}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    label={intl.formatMessage(choose, { thing: imgMessageHint })}
                    labelPosition="before"
                    style={styles.uploadButton}
                    containerElement="label"

                  >
                    <input
                      disabled={!this.state.imageUpload}
                      name={'img'} id={'product-image-file'} type="file" style={styles.uploadInput}
                    />
                  </FlatButton>
                </TableRowColumn>

              </TableRow>
            </TableBody>
          </Table>

        </Paper >
      </MuiPickersUtilsProvider>
    );
  }
}

ProductForm.propTypes = {
  // id: PropTypes.string,
  // setProduct: PropTypes.func,
  product: PropTypes.any,
  user: PropTypes.any,
  intl: PropTypes.any,
};

export default injectIntl(ProductForm);
