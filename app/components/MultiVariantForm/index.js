/**
*
* MultiVariantForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { DateTimePicker } from 'material-ui-pickers';
import ChipInput from 'material-ui-chip-input';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn,
} from 'material-ui/Table';
import { Paper, Subheader, FlatButton, RaisedButton, TextField, AutoComplete, IconButton, ToolbarGroup, Chip } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import { red500, green500, fullWhite } from 'material-ui/styles/colors';

import DateTimeLabel from '../DateTimeLabel';
import { GridList, GridTile } from 'material-ui/GridList';
// import styled from 'styled-components';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { List, ListItem } from 'material-ui/List';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Toolbar } from '../../../node_modules/@material-ui/core';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';

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
class MultiVariantForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      selectedStartDateTime: new Date('2018-01-01T00:00:00.000Z'),
      selectedEndDateTime: new Date('2018-01-01T00:00:00.000Z'),
      chips: ['js'],
      chipData: [
        { key: 0, label: '200 جرام' },
        { key: 1, label: '150 جرام' },
        { key: 2, label: '100 جرام' },
      ],
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.renderChip = this.renderChip.bind(this);
  }

  onBeforeAdd(chip) {
    return chip.length >= 3;
  }
  handleAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip]
    });
  }
  handleDelete(deletedChip) {
    this.setState({
      chips: this.state.chips.filter((c) => c !== deletedChip)
    });
  }
  handleDateChange = (date, start) => {
    this.setState({ [start ? 'selectedStartDateTime' : 'selectedEndDateTime']: date });
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
  handleRequestDelete = (key) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({ chipData: this.chipData });
  };
  renderChip(data) {
    return (
      <Chip
        key={data.key}
        style={{ margin: 4 }}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
      >
        {data.label}
      </Chip>
    );
  }
  render() {
    const { selectedStartDateTime, selectedEndDateTime } = this.state;

    return (
      <Paper >
        <Subheader className={'text-center'}> اعدادات المنتج متعدد الاشكال</Subheader>
        <Table allRowsSelected={false} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>وقت تسجيل المنتج : <DateTimeLabel /></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn>اسم الموظف : اكرم محمد عبد الرحمن</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
            <TableRow >
              <TableHeaderColumn rowSpan={3}>
                <TableRow ><TableRowColumn>اسم المنتج : نستله نس كافيه</TableRowColumn></TableRow>
                <TableRow ><TableRowColumn>الخصم الاجمالي : 0.0%</TableRowColumn></TableRow>
                <TableRow ><TableRowColumn>الكمية : 200</TableRowColumn></TableRow>
              </TableHeaderColumn>
              <TableRowColumn rowSpan={3}>
                <GridList
                  cellHeight={120}
                  cols={1}
                  style={styles.gridList}
                  spacing={2}
                >
                  <GridTile
                    title={'نستله نسكافيه'}
                    subtitle={<span>السعر <b>{'23 ريال'}</b></span>}
                  >
                    <img src={'https://loremflickr.com/320/240/nestle,nescafe'} role="presentation" />
                  </GridTile>
                </GridList>
              </TableRowColumn>
            </TableRow>
            <TableRow />
            <TableRow />
          </TableBody>
        </Table>
        <Toolbar className={'row m-b-15'}>
          <ToolbarGroup className={'col-sm-2 col-md-2 col-xs-2 col-lg-2 col-md-2'}>
            <AutoComplete
              dataSource={colors}
              onUpdateInput={this.handleUpdateInput}
              floatingLabelText="اسم السمة"
              filter={AutoComplete.fuzzyFilter}
              fullWidth
              style={{ textIndent: 3, height: '53px' }}

            />
          </ToolbarGroup>
          <ToolbarGroup style={{ marginTop: 17 }} className={'col-sm-8 col-md-8 col-xs-8 col-lg-8 col-md-8'} >
            <ChipInput
              blurBehavior={'add'}
              style={{ width: '75%' }}
            />
          </ToolbarGroup>

          <ToolbarGroup className={'col-sm-2 col-md-2 col-xs-2 col-lg-2 col-md-2'} >
            <RaisedButton
              label="اضافة سمة جديدة"
              primary
              style={styles.button}
              icon={<FontIcon className="material-icons" >control_point</FontIcon>}
            />

          </ToolbarGroup>

        </Toolbar>
        <Paper>
          <List fullWidth>
            <ListItem>
              <div className={'row'}>
                <div className={'col-lg-4 col-sm-4 col-md-4 col-xs-4'}>
                  الحجم
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    height: 'auto',
                  }}
                  className={'col-lg-8 col-sm-8 col-md-8 col-xs-8'}
                >
                  {this.state.chipData.map(this.renderChip, this)}

                </div>
              </div>
            </ListItem>
          </List>
        </Paper>
        <Divider className={'m-b-15'} />
        <Table
          height={{
            height: '300px',
          }}
          fixedHeader
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false} >
            <TableHeaderColumn className={'text-center'} >المتغيرات</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>الخصم</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>الكمية</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>السعر</TableHeaderColumn>
          </TableHeader>
          <TableBody >
            <TableRow>
              <TableHeaderColumn>اساسي</TableHeaderColumn>
              <TableHeaderColumn>0.0%</TableHeaderColumn>
              <TableHeaderColumn>32 وحدة</TableHeaderColumn>
              <TableHeaderColumn>23 ريال</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={{
                display: 'flex',
                flexWrap: 'wrap',
                height: 'auto',
              }}
              >
                {this.state.chipData.map(this.renderChip, this)}
              </TableRowColumn>
              <TableHeaderColumn><TextField className={'text-center'} defaultValue={'0.0%'} floatingLabelText={'خصم مخصص'} /></TableHeaderColumn>
              <TableHeaderColumn><TextField className={'text-center'} defaultValue={'15'} floatingLabelText={'كمية مخصصة'} /></TableHeaderColumn>
              <TableHeaderColumn><TextField className={'text-center'} defaultValue={'30 ريال'} floatingLabelText={'سعر وحدة مخصص'} /></TableHeaderColumn>

            </TableRow>
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >

            <TableRow>
              <TableRowColumn colSpan={2}>
                <RaisedButton
                  style={{ margin: 5 }}
                  backgroundColor={red500}
                  icon={<FontIcon color={fullWhite} className={'material-icons'}>delete_forever</FontIcon>}

                />
                <RaisedButton
                  style={{ margin: 5 }}
                  backgroundColor={green500}
                  icon={<FontIcon color={fullWhite} className={'material-icons'}>add_box</FontIcon>}

                />
              </TableRowColumn>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn></TableRowColumn>
              <TableRowColumn></TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper >
    );
  }
}

MultiVariantForm.propTypes = {

};

export default MultiVariantForm;
