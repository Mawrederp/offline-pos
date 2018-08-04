/**
*
* ProductForm
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { DateTimePicker } from 'material-ui-pickers';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Paper, Subheader, FlatButton, TextField, AutoComplete, Toggle } from 'material-ui';
import DateTimeLabel from '../DateTimeLabel';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
const Fragment = React.Fragment;
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
      discountIsTimed: false,
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.discountTimeToggle = this.discountTimeToggle.bind(this);
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
  render() {
    const { selectedStartDateTime, selectedEndDateTime, clearedDate } = this.state;
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
                <TableHeaderColumn><TextField floatingLabelText={'اسم المنتج'} /></TableHeaderColumn>
                <TableHeaderColumn><TextField floatingLabelText={'سعر الوحدة'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <AutoComplete
                    hintText="يمكنك البحث باستخدام احرف او كلمات"
                    dataSource={colors}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="المورد "
                    filter={AutoComplete.fuzzyFilter}
                    fullWidth
                    openOnFocus

                  />
                </TableHeaderColumn>
                <TableHeaderColumn><TextField floatingLabelText={'رقم التبويب'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn>
                  <AutoComplete
                    hintText="يمكنك البحث باستخدام احرف او كلمات"
                    dataSource={colors}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="الضريبة "
                    filter={AutoComplete.fuzzyFilter}
                    fullWidth
                    openOnFocus

                  />
                </TableHeaderColumn>
                <TableHeaderColumn><TextField floatingLabelText={'الكمية'} type={'number'} /></TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn><TextField floatingLabelText={'الخصم'} /></TableHeaderColumn>
                <TableHeaderColumn>
                  <Toggle
                    label="خصم مؤقت"
                    style={{ width: '75%' }}
                    onToggle={this.discountTimeToggle}
                  />
                </TableHeaderColumn>


              </TableRow>
              <TableRow>
                <TableHeaderColumn>

                  <div className={'picker'} >
                    <DateTimePicker
                      keyboard
                      label={'من'}
                      disabled={this.state.discountIsTimed}
                      onError={console.log}
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
                    <DateTimePicker
                      keyboard
                      label="الى"
                      disabled={this.state.discountIsTimed}
                      onError={console.log}
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
                    <input type="file" style={styles.uploadInput} />
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
  id: PropTypes.string,
};

export default ProductForm;
