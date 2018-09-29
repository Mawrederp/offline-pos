/**
 *
 * OpenRegistry
 *
 */

// import styled from 'styled-components';
import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl } from 'react-intl';
import messages from './messages';
import ReportForm from '../ReportForm';
import OpenRegistryReport from '../OpenRegistryReport';

class OpenRegistry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      formOutcome: null,
      receipts: props.box.receipts ? props.box.receipts : 0,
      cash: props.box.cash ? props.box.receipts : 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.receiptsChanged = this.receiptsChanged.bind(this);
    this.cashChanged = this.cashChanged.bind(this);
  }

  getStepContent(stepIndex) {
    console.log(this.props);
    switch (stepIndex) {
      case 0:
        return (<ReportForm
          box={this.props.box}
          receiptsChanged={this.receiptsChanged}
          cashChanged={this.cashChanged}
          user={this.props.user}
        />);
      case 1:
        return (<OpenRegistryReport
          box={this.props.box}
          user={this.props.user}
          cash={this.state.cash}
          receipts={this.state.receipts}
        />);
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  receiptsChanged(e, newValue) {
    console.log(newValue, 'receipts changed', e);
    this.setState({ receipts: newValue });
  }

  cashChanged(e, newValue) {
    console.log(newValue, 'cash changed', e);

    this.setState({ cash: newValue });
  }

  handleForm(e) {
    this.props.manageRegistry({ receipts: this.state.receipts, cash: this.state.cash, open: !this.props.box.open });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 1,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  render() {
    const {
      open,
      close,
      print,
      report,
      goBack,
      next,
      printAndContinue,
    } = messages;
    const { stepIndex } = this.state;
    const { intl, box } = this.props;
    const contentStyle = { margin: '0 16px' };
    const action = box.open ? intl.formatMessage(close) : intl.formatMessage(open);

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto', marginTop: 100 }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel> {`${action} ${intl.formatMessage(messages.box)}`}</StepLabel>
          </Step>
          <Step>
            <StepLabel>{`${intl.formatMessage(print)} ${intl.formatMessage(report)}`}</StepLabel>
          </Step>

        </Stepper>
        <div style={contentStyle}>
          {(
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label={intl.formatMessage(goBack)}
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 1 ? intl.formatMessage(printAndContinue) : intl.formatMessage(next)}
                  primary
                  onClick={stepIndex === 1 ? this.handleForm : this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

}

OpenRegistry.propTypes = {
  manageRegistry: PropTypes.func,
  box: PropTypes.any,
  user: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(OpenRegistry);
