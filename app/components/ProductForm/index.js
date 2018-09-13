/**
*
* ProductForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Paper, Subheader, FlatButton, TextField, AutoComplete, Toggle } from 'material-ui';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { DateTimePicker } from 'material-ui-pickers';
import DateTimeLabel from '../DateTimeLabel';
import { FormattedMessage } from 'react-intl';
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
const colors = [
  'احمر',
  'اصفر',
  'اسود',
  'اخضر',
  'Blue',
  'Purple',
  'Black',
  'White',
];
class ProductForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
  }

  handleClearedDateChange = (date) => {
    this.setState({ clearedDate: date });
  }
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
  }

  uploadImageToggle = (event, toggled) => {
    this.setState({ imageUpload: toggled });
  }

  handleSubmit(evt, sth, another) {
    evt.preventDefault();
    const data = new FormData(document.getElementById('products-form'));
    const dataObj = {};

    data.forEach((value, key) => {
      dataObj[key] = value;
    });
  }
  render() {
    const { selectedStartDateTime, selectedEndDateTime, clearedDate } = this.state;
    const { product } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>

        <Paper>
          <Subheader className={'text-center'}> تسجيل منتج</Subheader>
          <Table allRowsSelected={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn>وقت تسجيل المنتج : <DateTimeLabel /></TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn>اسم الموظف : اكرم محمد عبد الرحمن</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
              <TableRow>
                <TableHeaderColumn><TextField defaultValue={product.name} name={'name'} floatingLabelText={'اسم المنتج'} /></TableHeaderColumn>
                <TableHeaderColumn><TextField defaultValue={product.price} name={'price'} floatingLabelText={'سعر الوحدة'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <TextField defaultValue={product.supplier} name={'supplier'} floatingLabelText={'المورد'} />
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
                <TableHeaderColumn><TextField defaultValue={product.barcode} name={'barcode'} floatingLabelText={'رقم الباركود'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <TextField defaultValue={product.tax} name={'tax'} floatingLabelText={'الضريبة'} type={'number'} />
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
                <TableHeaderColumn><TextField defaultValue={product.quantity} name={'quantity'} floatingLabelText={'الكمية'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn><TextField defaultValue={product.discount} name={'discount'} floatingLabelText={'الخصم'} type={'number'} step={0.1} /></TableHeaderColumn>
                <TableHeaderColumn>
                  <Toggle
                    label="خصم مؤقت"
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
                      label={'من'}
                      disabled={!this.state.discountIsTimed}
                      onError={(err)=>err}
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
                      label="الى"
                      disabled={!this.state.discountIsTimed}
                      onError={(err)=>err}
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
                  <FlatButton
                    label="Choose an Image"
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
                <TableRowColumn>
                  <Toggle
                    label="خصم مؤقت"
                    style={{ width: '75%' }}
                    defaultToggled={!!this.state.imageUpload}
                    onToggle={this.uploadImageToggle}
                  />
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
  id: PropTypes.string,
  setProduct: PropTypes.func,
  product: PropTypes.any,
};

export default ProductForm;
