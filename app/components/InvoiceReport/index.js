/**
*
* InvoiceReport
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn,
} from 'material-ui/Table';
import { Print } from 'react-easy-print';
import { Paper, Subheader } from 'material-ui';
import DateTimeLabel from '../DateTimeLabel';
import data from '../../data';
import CartList from '../CartList';
function InvoiceReport({ items, invoice }) {
  return (
    <Print single name="invoice-report">

      <div className={'row'} style={{ overflow: 'hidden' }}>
        <Paper className={'col-xs-12 col-md-12 col-lg-12 col-sm-12'}>
          <Subheader className={'text-center'} style={{ fontWeight: 'bolder' }} >فاتورة</Subheader>
          <Subheader className={'text-center'}>اسم المتجر</Subheader>
          <Table style={{ padding: 10 }} allRowsSelected={false} selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
              <TableRow>
                <TableHeaderColumn className={'text-center'}>وقت تسجيل المنتج : <DateTimeLabel /></TableHeaderColumn>
                <TableHeaderColumn className={'text-center'}>رقم الفاتورة : #0100</TableHeaderColumn>
                <TableHeaderColumn className={'text-center'}>اسم الموظف : اكرم محمد عبد الرحمن</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
              <TableRow >
                <TableRowColumn colSpan={1000}>
                  <CartList data={data.products} noScroll style={{ width: '100%'}} />

                </TableRowColumn>
                <TableRowColumn />
                <TableRowColumn />
              </TableRow>
              <TableRow />
              <TableRow />
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Print>

  );
}

InvoiceReport.propTypes = {

};

export default InvoiceReport;
