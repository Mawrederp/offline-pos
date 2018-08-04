/**
*
* OpenRegıstry
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
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ReportForm from '../ReportForm';
import OpenRegistryReport from '../OpenRegistryReport';

class OpenRegıstry extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
    };
    this.handleNext = this.handleNext.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

 
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ReportForm />;
      case 1:
        return <OpenRegistryReport />;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
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
    const { finished, stepIndex } = this.state;
    const { openBox } = this.props;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>حالة الصندوق</StepLabel>
          </Step>
          <Step>
            <StepLabel>طباعة التقرير</StepLabel>
          </Step>

        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <RaisedButton
                label={'اعادة ضبط الصندووق'}
                primary
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({ stepIndex: 0, finished: false });
                }}
              />
            </p>
          ) : (
              <div>
                <p>{this.getStepContent(stepIndex)}</p>
                <div style={{ marginTop: 12 }}>
                  <FlatButton
                    label="الى الخلف"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    label={stepIndex === 1 ? 'طباعة و الذهاب الى الصفحة الرئيسية' : 'التالي'}
                    primary
                    onClick={stepIndex === 1 ? openBox : this.handleNext}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }

}

OpenRegıstry.propTypes = {
  openBox: PropTypes.func,
};

export default OpenRegıstry;
