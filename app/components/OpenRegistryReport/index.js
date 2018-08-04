/**
*
* OpenRegistryReport
*
*/

import React from 'react';
// import styled from 'styled-components';
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

function OpenRegistryReport() {
  return (
    <Paper>
      <Subheader className={'text-center'}>تقرير فتح الصندوق</Subheader>
      <Table allRowsSelected={false} selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>وقت فتح الصندوق  : <DateTimeLabel /></TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>اسم الموظف : اكرم محمد عبد الرحمن</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
          <TableRow>
            <TableHeaderColumn>رصيد الصندوق</TableHeaderColumn>
            <TableRowColumn>2000 ريال سعودي</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>مجموع الفواتير</TableHeaderColumn>
            <TableRowColumn>100 ريال سعودي</TableRowColumn>
          </TableRow>

        </TableBody>
      </Table>
      
    </Paper>
  );
}

OpenRegistryReport.propTypes = {

};

export default OpenRegistryReport;
