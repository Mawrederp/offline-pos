/**
 *
 * TransactionsList
 *
 */

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column: {
    flex: 1,
  },
  paddedColumn: {
    flex: 1,
    padding: '8px 24px 0px;',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  iconRtl: {
    left: '8px',
    right: 'auto',
  },
  iconNoRtl: {
    right: '8px',
    auto: 'auto',
  },
  bordered: {
    border: ' 1px #ccc solid',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class TransactionsList extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: 'panel1',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate() {
    if (this.props.activeTransaction !== '') {
      window.print();
      this.props.setActiveTransaction('');
    }
  }
  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  render() {
    const { classes, transactions, isRTL } = this.props;
    const idKey = '_id';
    console.log('the transactions i got are', transactions);
    const { expanded } = this.state;
    return (
      <div className={classes.root}>
        {transactions.map((transactionValue) => (
          <ExpansionPanel
            expanded={expanded === transactionValue[idKey]}
            onChange={this.handleChange(transactionValue[idKey])}
          >
            <ExpansionPanelSummary
              classes={{
                expandIcon: isRTL ? classes.iconRtl : classes.iconNoRtl,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  رقم الفاتورة:{' '}
                  {transactionValue[idKey].replace('TRANSACTION_', '')}
                </Typography>
                <Typography className={classes.heading}>
                  قيمة الفاتورة: {transactionValue.cart.total}
                </Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>
                  اسم الموظف :{transactionValue.user.replace('USER_', '')}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  الوقت :{' '}
                  {moment(new Date(transactionValue.createdAt)).format(
                    'dd , hh:mm:ss A'
                  )}
                </Typography>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails
              classes={{ root: classes.details }}
              className={classes.bordered}
            >
              <div className={classes.paddedColumn}>
                <div>الضريبة:</div>
                <div className={classes.paddedColumn + classes.bordered}>
                  {transactionValue.cart.tax ? transactionValue.cart.tax[0] : 0}{' '}
                  %
                </div>
              </div>
              <div className={classes.paddedColumn}>
                <div>الخصم:</div>
                <div className={classes.paddedColumn + classes.bordered}>
                  {transactionValue.cart.discount
                    ? transactionValue.cart.discount[0]
                    : 0}{' '}
                  %
                </div>
              </div>
              <div className={classes.paddedColumn}>
                <div>المبلغ المرجع :</div>
                <div className={classes.paddedColumn + classes.bordered}>
                  {(
                    transactionValue.cart.total -
                    parseFloat(
                      transactionValue.payments.reduce(
                        (acc, payment) => acc + payment.value,
                        0
                      )
                    )
                  ).toFixed(2)}{' '}
                  ريال سعودي
                </div>
              </div>
              <div className={classes.paddedColumn}>
                <div>المبلغ المستحق:</div>
                <div className={classes.paddedColumn + classes.bordered}>
                  {transactionValue.cart.total} ريال سعودي
                </div>
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button size="small">Cancel</Button>
              <Button
                size="small"
                color="secondary"
                onClick={() =>
                  this.props.setActiveTransaction(transactionValue[idKey])
                }
              >
                Print
              </Button>
              <Button size="small" color="primary">
                Edit
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

TransactionsList.propTypes = {
  classes: PropTypes.object.isRequired,
  isRTL: PropTypes.bool,
  transactions: PropTypes.any,
  setActiveTransaction: PropTypes.func,
  activeTransaction: PropTypes.string,
};

export default withStyles(styles)(TransactionsList);
