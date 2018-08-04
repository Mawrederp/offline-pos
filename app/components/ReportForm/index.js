/**
*
* ReportForm
*
*/

import React from 'react';
// import styled from 'styled-components';

import { Paper, Subheader, TextField, Avatar, Chip } from 'material-ui';
import { cyan600, white, black, cyan300 } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

import ButtonSet from '../ButtonSet';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white,
    lineHeight: '34px',
  },
  clearHeader: {
    fontSize: 16,
    fontWeight: typography.fontWeightMiddle,
    backgroundColor: white,
    color: black,
    lineHeight: '25px',

  },
  itemPropHeader: {
    padding: 0,
    lingHeight: '48px',
  },
  underlineStyle: {
    borderColor: cyan300,
  },
};
const mainButtons = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', 'C'],
];

const sideButtons = [
  ['+10'],
  ['+20'],
  ['+50'],
  [<FontIcon className="material-icons" >backspace</FontIcon>],
];
class ReportForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Paper>

        <Subheader style={{ padding: 15 }}>
          <Chip style={{ margin: 'auto' }}>
            <Avatar src="http://i.pravatar.cc/100" />
            اكرم محمد عبد الرحمن
              </Chip>
        </Subheader>
        <Divider />
        <div className={'col-sm-12 col-md-12 col-lg-12'}>
          <TextField
            className={'text-center'}
            fullWidth
            hintText={'اجمالي قيمة الفواتير'}
            floatingLabelText={'اجمالي قيمة الفواتير'}
            autoComplete={'off'}
            defaultValue="2.33"
          />
        </div>
        <div className={'col-sm-12 col-md-12 col-lg-12'}>
          <TextField
            fullWidth
            underlineStyle={styles.underlineStyle}
            autoComplete={'off'}
            hintText={'اجمالي النقود'}
            floatingLabelText={'اجمالي النقود'}

            className={'text-center'}
            defaultValue="2.55"
          />
        </div>
        <div className="buttons col-md-12 col-sm-12 col-lg-12">
          <ButtonSet
            buttons={sideButtons}
            pressHandler={(label) => this.buttonPressHandler(label)}
            className="sideButtonMatrix"
          />
          <ButtonSet
            buttons={mainButtons}
            pressHandler={(label) => this.buttonPressHandler(label)}
            className="mainButtonMatrix"
          />
        </div>
      </Paper>
    );
  }
}

ReportForm.propTypes = {

};

export default ReportForm;
