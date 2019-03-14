/**
 *
 * TransactionsTimedList
 *
 */

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
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import TransactionsList from '../TransactionsList';
const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    textTransform: 'capitalize',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'STRETCH',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexBasis: '100%',
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
});

class TransactionsTimedList extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: '',
      chosenDay: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }
  handleChange = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  handleDayChange = (event) => {
    this.setState({
      chosenDay: event.target.value,
    });
  };

  render() {
    const { classes, transactions, transactionTimeIndex, isRTL } = this.props;
    const timeIndexKeys = Object.keys(transactionTimeIndex);
    const { expanded } = this.state;
    return (
      <div
        className={classes.root}
        style={{
          scrollPaddingBottom: true,
          paddingBottom: 20,
          maxHeight: 480,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {timeIndexKeys.map((transactionKey) => (
          <ExpansionPanel
            expanded={expanded === transactionKey}
            onChange={this.handleChange(transactionKey)}
          >
            <ExpansionPanelSummary
              classes={{
                expandIcon: isRTL ? classes.iconRtl : classes.iconNoRtl,
              }}
              expandIcon={<ExpandMoreIcon />}
            >
              <div className={classes.column}>
                <Typography className={classes.heading}>
                  {transactionKey.replace('_', ' - ')}
                </Typography>
              </div>

              <div className={classes.column}>
                <Typography className={classes.heading}>العدد :</Typography>
                <Typography className={classes.heading}>
                  {Object.keys(transactionTimeIndex[transactionKey]).length}
                </Typography>
              </div>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails
              classes={{ root: classes.details }}
              className={classes.bordered}
            >
              <Toolbar>
                <FormControl
                  classes={{ root: classes.opaque }}
                  className={classes.column}
                >
                  <InputLabel
                    htmlFor="days-select"
                    className={classes.bootstrapFormLabel}
                  >
                    Day
                  </InputLabel>
                  <Select
                    value={this.state.chosenDay}
                    id="days-select"
                    onChange={this.handleDayChange}
                  >
                    <MenuItem value={''} defaultChecked>
                      all days
                    </MenuItem>
                    <MenuItem value={'sunday'}>Sunday</MenuItem>
                    <MenuItem value={'monday'}>Monday</MenuItem>
                    <MenuItem value={'tuesday'}>Tuesday</MenuItem>
                    <MenuItem value={'wednesday'}>Wednesday</MenuItem>
                    <MenuItem value={'thursday'}>Thursday</MenuItem>
                    <MenuItem value={'friday'}>Friday</MenuItem>
                    <MenuItem value={'saturday'}>Saturday</MenuItem>
                  </Select>
                </FormControl>
              </Toolbar>

              <TransactionsList
                isRTL={isRTL}
                transactions={Object.keys(transactions)
                  .filter((key) => {
                    const timeIndexSubKeys = Object.keys(
                      transactionTimeIndex[transactionKey]
                    );
                    if (!timeIndexSubKeys.includes(key.replace(' ', ''))) {
                      console.log('its right at last');
                      return false;
                    }
                    console.log(this.state.chosenDay);
                    if (
                      this.state.chosenDay &&
                      !timeIndexSubKeys
                        .filter((transactionTimeKey) => {
                          console.log(
                            transactionTimeIndex[transactionKey][
                              transactionTimeKey
                            ].day
                          );
                          return (
                            transactionTimeIndex[transactionKey][
                              transactionTimeKey
                            ].day === this.state.chosenDay
                          );
                        })
                        .includes(key.replace(' ', ''))
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((key) => this.props.transactions[key])}
              />
            </ExpansionPanelDetails>

          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

TransactionsTimedList.propTypes = {
  classes: PropTypes.object.isRequired,
  isRTL: PropTypes.bool,
  transactions: PropTypes.any,
  transactionTimeIndex: PropTypes.any,
};

export default withStyles(styles)(TransactionsTimedList);
