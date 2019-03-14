/**
 *
 * OpenRegistryReport
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
import { injectIntl } from 'react-intl';
import { Paper, Subheader } from 'material-ui';
import { Print } from 'react-easy-print';
import DateTimeLabel from '../DateTimeLabel';
import messages from './messages';

function OpenRegistryReport({ cash, box, receipts, user, intl }) {
  const {
    open,
    close,
    BoxActionTime,
    EmployeeName,
    currencySr,
    cashBalance,
    receiptsBalance,
    theCash,
    theReceipts,
    BoxReport,
    balance,
  } = messages;
  const saudiRiyal = intl.formatMessage(currencySr);
  const action = box.open
    ? intl.formatMessage(close)
    : intl.formatMessage(open);
  return (
    <Print single name="Registry-report">
      <Paper>
        <Subheader className={'text-center'}>
          {intl.formatMessage(BoxReport, { action })}
        </Subheader>
        <Table allRowsSelected={false} selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>
                {intl.formatMessage(BoxActionTime, { action })} :{' '}
                <DateTimeLabel />
              </TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn>
                {intl.formatMessage(EmployeeName)} : {user.fullName}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover={false}
          >
            <TableRow>
              <TableHeaderColumn>
                {intl.formatMessage(cashBalance, {
                  cash: intl.formatMessage(theCash),
                  balance: intl.formatMessage(balance),
                })}
              </TableHeaderColumn>
              <TableRowColumn>{cash}</TableRowColumn>
              <TableRowColumn>{saudiRiyal}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>
                {intl.formatMessage(receiptsBalance, {
                  receipts: intl.formatMessage(theReceipts),
                  balance: intl.formatMessage(balance),
                })}
              </TableHeaderColumn>
              <TableRowColumn>{receipts}</TableRowColumn>
              <TableRowColumn>{saudiRiyal}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Print>
  );
}

OpenRegistryReport.propTypes = {
  box: PropTypes.object,
  user: PropTypes.object,
  cash: PropTypes.any,
  intl: PropTypes.any,
  receipts: PropTypes.any,
};

export default injectIntl(OpenRegistryReport);
