/**
*
* InvoiceReport
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import { FormattedMessage } from 'react-intl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import { Print } from 'react-easy-print';
import { Paper, Subheader } from 'material-ui';
import DateTimeLabel from '../DateTimeLabel';
import { TAX_ID } from '../../config/teller';
import messages from './messages';

function VariantIdToString(variantPropId) {
  const props = variantPropId.split('$');
  const features = props[0].split('_');
  const variants = props[1].split('_');
  return features.map((val, index) => `${val}:${variants[index]}`).join(',');
}
function InvoiceReport({ data, user, payments, endResult }) {
  console.log({data,user,payments, endResult})
  return (
    <Print printOnly single name="invoice-report">

      <div style={{ position: 'fixed', top: 0, left: 0 }} className={'row'} >
        <Paper className={'col-xs-12 col-md-12 col-lg-12 col-sm-12'}>
          <Subheader className={'text-center'} style={{ fontWeight: 'bolder' }} >فاتورة</Subheader>
          <Subheader className={'text-center'}>اسم المتجر</Subheader>
          <Subheader className={'text-center'}>الرقم الضريبي : {TAX_ID}</Subheader>

          <Table
            style={{ padding: 10 }}
            allRowsSelected={false}
            selectable={false}
            fixedHeader
            fixedFooter
          >
            <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>

              <TableRow>
                <TableHeaderColumn colSpan={2} className={'text-center'}>وقت تسجيل المنتج : <DateTimeLabel /></TableHeaderColumn>
                <TableHeaderColumn colSpan={2} className={'text-center'}>رقم الفاتورة : #0100</TableHeaderColumn>
                <TableHeaderColumn colSpan={2} className={'text-center'}>اسم الموظف : {user.fullName}</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn colSpan={2}>الاسم</TableHeaderColumn>
                <TableHeaderColumn>الكمية</TableHeaderColumn>
                <TableHeaderColumn>سعر الوحدة</TableHeaderColumn>
                <TableHeaderColumn>الخصم</TableHeaderColumn>
                <TableHeaderColumn>الضريبة</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
              {
                data.products.map((item, index) =>
                  <TableRow key={index} >
                    <TableRowColumn colSpan={2} >
                      {item.product.name} {item.variantPropId === '$' ? '' : <span style={{ fontSize: '0.8em' }}>({VariantIdToString(item.variantPropId)})</span>}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.quantity}
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.price} <span style={{ fontSize: '0.8em' }}>ريال</span>
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.discount}%
                    </TableRowColumn>
                    <TableRowColumn>
                      {item.tax}%
                    </TableRowColumn>
                  </TableRow>
                )
              }

            </TableBody>

          </Table>
          <div className={'row'}>
            <div style={{ padding: 12 }} className={'text-center col-md-6 col-xs-6 col-lg-6 col-sm-6'}>
              <Barcode value={`${Math.random() * 99999999999999999999}`} />

            </div>
            <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6'}>
              <Table
                allRowsSelected={false}
                selectable={false}
              >
                <TableBody
                  displayRowCheckbox={false}
                  deselectOnClickaway={false}
                  showRowHover={false}
                >

                  <TableRow >
                    <TableHeaderColumn >
                      <Subheader className={'text-center'}>المجموع(قبل الضريبة)</Subheader>
                    </TableHeaderColumn>
                    <TableRowColumn colSpan={1}>
                      <Subheader className={'text-center'}>{parseFloat(data.subTotal).toFixed(2)} ريال</Subheader>
                    </TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableHeaderColumn >
                      <Subheader className={'text-center'}>المجموع(بعد الضريبة)</Subheader>
                    </TableHeaderColumn>
                    <TableRowColumn >
                      <Subheader className={'text-center'}>{parseFloat(data.total).toFixed(2)} ريال</Subheader>
                    </TableRowColumn>
                  </TableRow>
                  <TableRow >
                    <TableHeaderColumn >
                      <Subheader className={'text-center'}>المجموع(بعد الخصم)</Subheader>
                    </TableHeaderColumn>
                    <TableRowColumn >
                      <Subheader className={'text-center'}>{parseFloat(data.total).toFixed(2)} ريال</Subheader>
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Subheader className={'text-center'}>رقم الهاتف :  (00966) 0559565411 </Subheader>
              <Subheader className={'text-center'}>العنوان : جدة</Subheader>
              <Subheader className={'text-center'}>الايميل : exampleemaıl.com</Subheader>
            </div>
          </div>
        </Paper>
      </div>
    </Print>

  );
}

InvoiceReport.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
  payments: PropTypes.array,
  endResult: PropTypes.object,
};

export default InvoiceReport;
