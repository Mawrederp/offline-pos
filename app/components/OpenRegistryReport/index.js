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
import DateTimeLabel from '../DateTimeLabel';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Paper, Subheader } from 'material-ui';

function OpenRegistryReport({ cash, box, receipts, user }) {
  const action = box.open ? 'اغلاق' : 'فتح';
  return (
    <Paper>
      <Subheader className={'text-center'}> تقرير {action} الصندوق</Subheader>
      <Table allRowsSelected={false} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>وقت {action} الصندوق : <DateTimeLabel /></TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>اسم الموظف : {user.fullName}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
          <TableRow>
            <TableHeaderColumn>رصيد الصندوق</TableHeaderColumn>
            <TableRowColumn>{cash}</TableRowColumn>
            <TableRowColumn>ريال سعودي</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>مجموع الفواتير</TableHeaderColumn>
            <TableRowColumn>{receipts}</TableRowColumn>
            <TableRowColumn>ريال سعودي</TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>

    </Paper>
  );
}

OpenRegistryReport.propTypes = {
  box: PropTypes.object,
  user: PropTypes.object,
  cash: PropTypes.any,
  receipts: PropTypes.any,
};

export default OpenRegistryReport;
