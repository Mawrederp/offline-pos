/**
 *
 * InvoiceReport
 *
 */

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import { injectIntl } from 'react-intl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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

function InvoiceReport({ data, user, payments, endResult, intl }) {
  console.log({ data, user, payments, endResult });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0 }} className={'row'}>
      <Paper className={'col-xs-12 col-md-12 col-lg-12 col-sm-12'}>
        <Subheader className={'text-center'} style={{ fontWeight: 'bolder' }}>
          {intl.formatMessage(messages.receipt)}
        </Subheader>
        <Subheader className={'text-center'}>
          {intl.formatMessage(messages.MarketName)}
        </Subheader>
        <Subheader className={'text-center'}>
          {intl.formatMessage(messages.TaxIdNo)} : {TAX_ID}
        </Subheader>

        <Table
          style={{ padding: 10 }}
          allRowsSelected={false}
          selectable={false}
          fixedHeader
          fixedFooter
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn colSpan={2} className={'text-center'}>
                {intl.formatMessage(messages.time)} : <DateTimeLabel />
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={2} className={'text-center'}>
                {intl.formatMessage(messages.receiptNumber)}: #0100
              </TableHeaderColumn>
              <TableHeaderColumn colSpan={2} className={'text-center'}>
                {intl.formatMessage(messages.EmployeeName)} : {user.fullName}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn colSpan={2}>
                {intl.formatMessage(messages.fullNameText)}
              </TableHeaderColumn>
              <TableHeaderColumn>
                {intl.formatMessage(messages.quantity)}
              </TableHeaderColumn>
              <TableHeaderColumn>
                {intl.formatMessage(messages.unitPrice, {
                  theUnit: intl.formatMessage(messages.theUnit),
                  price: intl.formatMessage(messages.price),
                })}
              </TableHeaderColumn>
              <TableHeaderColumn>
                {intl.formatMessage(messages.discount)}
              </TableHeaderColumn>
              <TableHeaderColumn>
                {intl.formatMessage(messages.tax)}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
          >
            {data.products.map((item, index) => (
              <TableRow key={index}>
                <TableRowColumn colSpan={2}>
                  {item.product.name}{' '}
                  {item.variantPropId === '$' ? (
                    ''
                  ) : (
                    <span style={{ fontSize: '0.8em' }}>
                      ({VariantIdToString(item.variantPropId)})
                    </span>
                  )}
                </TableRowColumn>
                <TableRowColumn>{item.quantity}</TableRowColumn>
                <TableRowColumn>
                  {item.price}{' '}
                  <span style={{ fontSize: '0.8em' }}>
                    {intl.formatMessage(messages.currencySr)}
                  </span>
                </TableRowColumn>
                <TableRowColumn>{item.discount}%</TableRowColumn>
                <TableRowColumn>{item.tax}%</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={'row'}>
          <div
            style={{ padding: 12 }}
            className={'text-center col-md-6 col-xs-6 col-lg-6 col-sm-6'}
          >
            <Barcode value={`${String(data.id).replace('TRANSACTION_', '')}`} />
          </div>
          <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6'}>
            <Table allRowsSelected={false} selectable={false}>
              <TableBody
                displayRowCheckbox={false}
                deselectOnClickaway={false}
                showRowHover={false}
              >
                <TableRow>
                  <TableHeaderColumn>
                    <Subheader className={'text-center'}>
                      {intl.formatMessage(messages.total)}(
                      {intl.formatMessage(messages.beforeTax)})
                    </Subheader>
                  </TableHeaderColumn>
                  <TableRowColumn colSpan={1}>
                    <Subheader className={'text-center'}>
                      {parseFloat(data.subTotal).toFixed(2)}{' '}
                      {intl.formatMessage(messages.currencySr)}
                    </Subheader>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>
                    <Subheader className={'text-center'}>
                      ({intl.formatMessage(messages.discount)})
                    </Subheader>
                  </TableHeaderColumn>
                  <TableRowColumn>
                    <Subheader className={'text-center'}>
                      {parseFloat(
                        data.total *
                          (data.discount[0] > 0
                            ? data.discount / 100
                            : data.discount)
                      ).toFixed(2)}{' '}
                      {intl.formatMessage(messages.currencySr)}
                    </Subheader>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>
                    <Subheader className={'text-center'}>
                      {intl.formatMessage(messages.total)}(
                      {intl.formatMessage(messages.afterTax)})
                    </Subheader>
                  </TableHeaderColumn>
                  <TableRowColumn>
                    <Subheader className={'text-center'}>
                      {parseFloat(data.total).toFixed(2)}{' '}
                      {intl.formatMessage(messages.currencySr)}
                    </Subheader>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Subheader className={'text-center'}>
              {intl.formatMessage(messages.phone)} : (00966) 0559565411{' '}
            </Subheader>
            <Subheader className={'text-center'}>
              {intl.formatMessage(messages.address)} : جدة
            </Subheader>
            <Subheader className={'text-center'}>
              {intl.formatMessage(messages.emailText)} : exampleemaıl.com
            </Subheader>
          </div>
        </div>
      </Paper>
    </div>
  );
}

InvoiceReport.propTypes = {
  data: PropTypes.object,
  user: PropTypes.object,
  payments: PropTypes.array,
  endResult: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(InvoiceReport);
