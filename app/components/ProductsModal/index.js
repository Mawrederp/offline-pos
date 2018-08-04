/**
*
* ProductsModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Subheader } from 'material-ui';
import ProductForm from '../ProductForm';
import MultiVariantForm from '../MultiVariantForm';
const Fragment = React.Fragment;
const ProductTypeSelection = ({ handleSelection }) => (
  <div className={'row'}>
    <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6 m-b-15'}>
      <RaisedButton
        label={'اساسي'}
        primary
        fullWidth
        onClick={() => handleSelection(true)}
      />
    </div>
    <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6 m-b-15'}>
      <RaisedButton
        label={'متعدد الاصناف'}
        primary
        fullWidth
        onClick={() => handleSelection()}
      />
    </div>
  </div>
);

class ProductsModal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      basicProduct: false,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <ProductTypeSelection handleSelection={this.handleSelection} />;
      case 1:
        return (
          <ProductForm />
        );
      case 2:
        if (this.state.basicProduct) {
          this.handleClose();
        }
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MultiVariantForm />
          </MuiPickersUtilsProvider>);
      default:
        this.handleClose();
        return null;
    }
  }
  handleClose = () => {
    this.setState({
      finished: false,
      stepIndex: 0,
      basicProduct: false,
    });
    this.props.handleClose();
  }
  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  handleSelection = (selection) => {
    this.setState({ basicProduct: selection });
    this.handleNext();
  };
  render() {
    console.log(this.props)
    const { open, id } = this.props;
    const { stepIndex, handleClose } = this.state;
    const actions = [

      <FlatButton
        label="الى الخلف"
        disabled={stepIndex === 0}
        onClick={this.handlePrev}
        style={{ marginRight: 12 }}
      />,
      <Fragment>
        {
          stepIndex === 2 ? <span></span>
            :
            <RaisedButton
              label={'التالي'}
              primary
              onClick={this.handleNext}
            />
        }
      </Fragment>,
      <FlatButton
        label={stepIndex === 2 ? 'انهاء' : 'الغاء'}
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        title={id ? 'تعديل منتج' : 'انشاء منتج جديد'}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent
        style={{ zIndex: 1300 }}
        container={() => document.getElementById(id)}

        contentStyle={{ width: '100%', maxWidth: 'none' }}
        fullWidth
      >
        {id ? (<ProductForm id={id} />)
          : (
            <div>
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel>اختيار نوع المنتج</StepLabel>
                </Step >
                <Step>
                  <StepLabel>معلومات المنتج الاساسية</StepLabel>
                </Step>
                <Step>
                  <StepLabel>اعدادات المنتج متعدد الاشكال</StepLabel>
                </Step>

              </Stepper >
              {this.getStepContent(stepIndex)}

            </div>
          )
        }
      </Dialog>
    );
  }
}

ProductsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
};

export default ProductsModal;
